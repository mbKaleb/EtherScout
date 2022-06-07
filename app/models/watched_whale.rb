class WatchedWhale < ApplicationRecord
  belongs_to :user
  belongs_to :whale_wallet

  validates :wallet_address, length: {is: 64 }, uniqueness: true

end
