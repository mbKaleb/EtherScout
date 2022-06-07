class WhaleWallet < ApplicationRecord

    validates :wallet_address, length: {is: 42}, uniqueness: true

end
