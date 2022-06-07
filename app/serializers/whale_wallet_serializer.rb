class WhaleWalletSerializer < ActiveModel::Serializer
  attributes :id, :wallet_address, :alias
end
