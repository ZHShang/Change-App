class Api::TransactionsController < PlaidController
  def create
    sortedGoals = Array.new
    client = plaid_client
    item = Item.find_by_user_id(params[:user_id])
    user = User.find_by_id(params[:user_id])
    admin = User.where(is_admin: true)[0]
    sortedCharitiesIndex = gettingIndex(admin.votes)
    charitiesById = sortedCharitiesIndex.collect {|i| Charity.find(i) }
    oldAdminBal = admin.current_roundup_balance


    if Transaction.where(item_id: item)

      Transaction.where(item_id: item).destroy_all
      #Maybe create a now function to get current date to retrieve relevant data
      transaction_response = client.transactions.get(item.access_token, 'START DATE', 'END DATE')
      transactions = transaction_response.transactions

      while transactions.length < transaction_response['total_transactions']
        transaction_response = client.transactions.get(
                                            access_token,
                                            'START DATE',
                                            'END DATE',
                                            offset: transactions.length)
        transactions += transaction_response.transactions
      end

      roundup = 0


      for transaction in transactions do
        singleRoundup = 0
        @transaction = Transaction.new()
        @transaction.name = transaction.name
        @transaction.amount = transaction.amount
        if transaction.amount > 0
          singleRoundup = (transaction.amount.ceil - transaction.amount).round(2)
          roundup += singleRoundup.round(2)
        end
        @transaction.roundup = singleRoundup
        @transaction.date = transaction.date
        @transaction.category_id = transaction.category_id
        @transaction.item = item
        @transaction.save
      end

      user.current_roundup_balance = roundup
      admin.current_roundup_balance = oldAdminBal + roundup
      admin.total_balance = admin.total_balance + roundup
      admin.save
      user.save
      @total_balance = admin.total_balance


    end

    charitiesById.each do |charity|
      sortedGoals.push(charity.goals[0])
    end
    charitiesById.each do |charity|
      sortedGoals.push(charity.goals[1])
    end



    sortedGoals.each do |goal|
      if goal.completed === false
        if goal.cost <= admin.current_roundup_balance
          admin.current_roundup_balance = (admin.current_roundup_balance - goal.cost).round(2)
          goal.completed = true
          goal.save
          admin.save
        end
      end
    end

    @trans = Transaction.where(item_id: item)
    render :json => {
      transaction: @trans,
      roundup: roundup,
      total_balance: @total_balance,
    }


  end

  private

  def gettingIndex(array)
    sortedIndex = Array.new
    sorted = array.sort {|x,y| -(x <=> y)}
    sorted.each do |x|
      sortedIndex.push(array.index(x))
    end
    return sortedIndex.map {|n| n + 1}
  end

end
