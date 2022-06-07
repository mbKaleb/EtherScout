class CreateWatchedWhales < ActiveRecord::Migration[6.1]
  def change
    create_table :watched_whales do |t|
      t.references :user, null: false, foreign_key: true
      t.references :whale_wallet, null: false, foreign_key: true
      t.string :alias

      t.timestamps
    end
  end
end
