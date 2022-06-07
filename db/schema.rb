# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_27_232631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "custom_wallets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "wallet_address"
    t.string "alias"
    t.boolean "is_favorite"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_custom_wallets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "watched_whales", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "whale_wallet_id", null: false
    t.string "alias"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_watched_whales_on_user_id"
    t.index ["whale_wallet_id"], name: "index_watched_whales_on_whale_wallet_id"
  end

  create_table "whale_wallets", force: :cascade do |t|
    t.string "wallet_address"
    t.string "alias"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "custom_wallets", "users"
  add_foreign_key "watched_whales", "users"
  add_foreign_key "watched_whales", "whale_wallets"
end
