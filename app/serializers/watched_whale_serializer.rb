class WatchedWhaleSerializer < ActiveModel::Serializer
  attributes :id, :alias
  has_one :user
  has_one :whale_wallet
end
