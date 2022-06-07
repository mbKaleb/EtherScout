class CustomWalletSerializer < ActiveModel::Serializer
  attributes :id, :wallet_address, :alias, :is_favorite
  has_one :user
end
