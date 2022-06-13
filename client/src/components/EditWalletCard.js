//The editable-wallet component

//React Imports
import { useState, useEffect } from "react"

//Library Imports
import { ethers } from "ethers";

import { ETHERSCANKEY } from "../keys";

export default function EditWalletCard({ wallet }) {

    //Local State
    const [walletBalance, setWalletBalance] = useState()
    const [isBeingEdited, setIsBeingEdited] = useState(false)

    //Form State
    let initialFormState = wallet
    const [formState, setFormState] = useState(initialFormState)

    //Styles
    const boldFont = "font-semibold flex"
    const normalFont = "font-normal ml-2"

    //Basic Variable Assignment
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet.wallet_address}&tag=latest&apikey=${ETHERSCANKEY}`

    //Fetch Assignment
    const userWalletFetch = () => {
        fetch(url).then(r => r.json()).then(r => {
            if (r.message === "OK") {
                setWalletBalance(r.result)
            } else {
                setTimeout(() => userWalletFetch(), 500)
            }
        })
    }
    const editWalletFetch = () => {
        fetch('/custom_wallets/' + wallet.id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: wallet.id,
                alias: formState.alias,
                wallet_address: formState.wallet_address
            }),
        })
    }
    const deleteWalletFetch = () => {
        fetch('/custom_wallets/' + wallet.id, {
            method: 'DELETE'
        })
    }
    // const favoriteWalletFetch = () => {
    //     console.log('ran')
    // }

    //Handler Assignment
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormState(formState => ({ ...formState, [name]: value }))
    }
    const toggleEditForm = () => {
        setIsBeingEdited(!isBeingEdited)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        editWalletFetch()
        toggleEditForm()
        window.location.reload();
    }
    const cancelHandler = () => {
        setFormState(initialFormState)
        toggleEditForm()
    }
    const deleteHandler = () => {
        deleteWalletFetch()
        window.location.reload();
    }

    //On Page Load:
    useEffect(() => {
        userWalletFetch()
    }, [])


    if (isBeingEdited) {
        return (
            <div className="bg-white outline outline-2 outline-purple-600 rounded m-3 p-1">

                <form className="flex grid" >
                    <label className="flex font-semibold m-1 mt-2">Hexadecimal Address:</label>
                    <input className="m-2 flex rounded bg-gray-100 drop-shadow"
                        type="text"
                        value={formState.wallet_address}
                        placeholder={wallet.wallet_address}
                        name="wallet_address"
                        onChange={handleInput}
                    />
                    <label className="flex font-semibold m-1 mt-2">Alias:</label>
                    <input className="m-2 flex rounded bg-gray-100 drop-shadow"
                        type="text"
                        value={formState.alias}
                        placeholder={wallet.alias}
                        name="alias"
                        onChange={handleInput}
                    />
                </form>
                <div><button className="outline outline-1 rounded p-0.5 " onClick={submitHandler}>Apply</button><button className="outline outline-1 rounded m-2 p-0.5" onClick={cancelHandler} >Cancel</button></div>
            </div>
        )
    } else {
        return (
            <div className="bg-white outline outline-1 outline-blue-600 rounded m-3 p-1">
                <div className={boldFont} >Alias:   <div className={normalFont} >{wallet ? wallet.alias : null}</div> </div>
                <div className={boldFont} >Address: <div className={normalFont} >{wallet ? wallet.wallet_address : null}</div> </div>
                <div className={boldFont} >Balance: <div className={normalFont} >{walletBalance ? ethers.utils.formatUnits(walletBalance, 'ether') + " ETH" : "Loading..."}</div> </div>
                <div><button className="outline outline-1 rounded px-0.5 m-0.5 font-light mt-3" onClick={toggleEditForm}>Edit</button><button className="outline outline-1 rounded px-0.5 m-0.5 font-light" onClick={deleteHandler}>Delete</button></div>
            </div>
        )
    }

}

