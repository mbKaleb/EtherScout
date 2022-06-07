# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#   WhaleWallet.create(wallet_address: "", alias: "")

pp "Seeding Whales"
WhaleWallet.create(wallet_address: "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf", alias: "Kraken 13")
WhaleWallet.create(wallet_address: "0x73bceb1cd57c711feac4224d062b0f6ff338501e", alias: "Unknown 5")
WhaleWallet.create(wallet_address: "0x9bf4001d307dfd62b26a2f1307ee0c0307632d59", alias: "Unknown 6")
WhaleWallet.create(wallet_address: "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2", alias: "Unknown 11")
WhaleWallet.create(wallet_address: "0xe92d1a43df510f82c66382592a047d288f85226f", alias: "Unknown 13")
WhaleWallet.create(wallet_address: "0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca", alias: "Unknown 19")
WhaleWallet.create(wallet_address: "0xa7efae728d2936e78bda97dc267687568dd593f3", alias: "okeX 3")
WhaleWallet.create(wallet_address: "0x176f3dab24a159341c0509bb36b833e7fdd0a132", alias: "Unknown 25")

pp "Seeding Suspicious Wallets"
WhaleWallet.create(wallet_address: "0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B", alias: "Fake: Enigma Presale")
WhaleWallet.create(wallet_address: "", alias: "")


pp "done"
