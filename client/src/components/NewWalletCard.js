import { useState } from "react";

export default function NewWalletCard({ currentUser, toggleFormHandler, isHidden }) {


    //Variable Assignment
    const initialformState = {
        wallet_address: '',
        alias: "",
        is_favorite: false
    }

    //Local State
    const [formState, setFormState] = useState(initialformState)

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormState(formState => ({ ...formState, [name]: value }))
    }
    const confirmHandler = (e) => {
        e.preventDefault()
        postNewWallet()
        window.location.reload();
    }
    const cancelHandler = (e) => {
        e.preventDefault()
        toggleFormHandler()
        setFormState(initialformState)
    }

    //Fetch Assignment
    const postNewWallet = () => {
        fetch('/custom_wallets', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                wallet_address: formState.wallet_address,
                alias: formState.alias
            }),
        })
    }



    if (isHidden) {
        return null
    } else {
        return (
            <div className="bg-white w-64 outline outline-1 outline-purple-600 h-64 w-80 rounded m-4 p-2">
                <form className="grid">
                    <div className=" rounded text-center">New Wallet</div>

                    <label className="flex font-semibold m-1 mt-2">Wallet Address:</label>
                    <input className="m-2 flex rounded bg-gray-100 drop-shadow"
                        type="text"
                        value={formState.wallet_address}
                        placeholder=" wallet address"
                        name="wallet_address"
                        onChange={handleInput}
                    />
                    <label className="flex font-semibold m-1 mt-2">Wallet Nickname:</label>
                    <input className="m-2 rounded bg-gray-100 drop-shadow"
                        type="text"
                        value={formState.alias}
                        placeholder=" alias"
                        name="alias"
                        onChange={handleInput}
                    />
                    <div><button className="rounded outline outline-1 m-1 p-0.5" onClick={confirmHandler}>Confirm</button><button className="rounded outline outline-1 m-1" onClick={cancelHandler}>Cancel</button></div>
                </form>
            </div>
        )
    }
}