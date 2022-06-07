class CreateWhaleWallets < ActiveRecord::Migration[6.1]
  def change
    create_table :whale_wallets do |t|
      t.string :wallet_address
      t.string :alias

      t.timestamps
    end
  end
end
