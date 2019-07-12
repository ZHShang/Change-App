require 'plaid'
class PlaidController < ApplicationController

  def plaid_client
   @client ||= Plaid::Client.new(env: [ENV'PLAID_ENV'],
                           client_id: [ENV'PLAID_CLIENT_ID'],
                           secret: [ENV'PLAID_SECRET'],
                           public_key: [ENV'PLAID_PUBLIC_KEY'],)
  end

end
