require 'json'
class Api::UsersController < ApplicationController
  def index
    @users = User.all
    puts "users:"
    puts @users
    puts "credentials:"
    puts session[:user_id]

    render :json => {
      users: @users
    }
  end

  def show
    @user = User.find_by_id(sesssoin[:user_id])
    @admin = User.where(is_admin: true)[0]
    render :json => {
      user: @user,
      admin: @admin
    }
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      render :json => {
        success: true,
        user_id: @user.id,
        first_name: @user.first_name
      }
    else
      render :json => {message: "account not created"}
    end
  end

  def destroy
    @user = User.where(id: params[:id]).first
    if @user.destroy
      head(:ok)
    else
      head(:unprocessable_entity)
    end
  end

  def edit
    @user = User.find_by_id(session[:user_id])
  end

  def update
    admin = User.where(is_admin: true)[0]
    user = User.find_by_id(session[:user_id])
    old_user_votes = user.votes
    admin_votes = admin.votes
    new_admin_votes = admin_votes.zip(old_user_votes).map{|pair| pair.reduce(&:-)}
    user_votes = user_params[:votes]
    a1 = admin_votes[0]
    a2 = admin_votes[1]
    a3 = admin_votes[2]
    a4 = admin_votes[3]
    a5 = admin_votes[4]
    u1 = user_votes[0]
    u2 = user_votes[1]
    u3 = user_votes[2]
    u4 = user_votes[3]
    u5 = user_votes[4]
    new_admin_votes = [a1+u1,a2+u2,a3+u3,a4+u4,a5+u5]
    user.update_attributes(user_params)
    admin.votes = new_admin_votes
    admin.save

    render :json => {
      currentUser: user,
      admin_votes: admin.votes,
      user_votes: user.votes
    }

  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :password, :password_confirmation, :email, :plaid_token, :stripe_token, :current_roundup_balance, :balance_date, :is_admin, votes: [])
  end

end
