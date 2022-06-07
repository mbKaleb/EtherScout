class CreateCustomWallets < ActiveRecord::Migration[6.1]
  def change
    create_table :custom_wallets do |t|
      t.references :user, null: false, foreign_key: true
      t.string :wallet_address
      t.string :alias
      t.boolean :is_favorite

      t.timestamps
    end
  end
end
