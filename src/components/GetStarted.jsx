import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { contractAddress, contractAbi } from "../utils/constants"
import Spinner from "./Spinner"
import {FiClipboard} from 'react-icons/fi'
import {AiFillCheckCircle} from 'react-icons/ai'

function GetStarted() {

  const { ethereum } = window
  const [currentAccount, setCurrentAccount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [sucess, setIsSucessful] = useState(false)
  const [vox, setVox] = useState("")
  const [passcode, setPasscode] = useState()
  const [hash, setHash] = useState("")
  const [identifier, setIdentifier] = useState()

  useEffect(() => {
    isTheWalletConnected()
  }, [])

  const isTheWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metask")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log("No accounts found")
      }
    } catch (error) {
      throw new Error("No ethereum object")
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object")
    }
  }

  const handleVox = (event) => {
    setVox(event.target.value)
  }

  const handlePasscode = (event) => {
    setPasscode(event.target.value)
  }

  const publishVox = async () => {
    const voxContract = getVoxContract()
    console.log(voxContract)

    const txHash = await voxContract.addVox(vox, passcode)

    const identifier = await voxContract.getLast()

    setIdentifier(identifier)
    console.log(identifier)


    setIsLoading(true)
    console.log("Adding vox")

    await txHash.wait()

    console.log(txHash)
    setHash(txHash)
    setIsLoading(false)
    setIsSucessful(true)
    console.log("Success!")
  }

  const getVoxContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const vox = new ethers.Contract(contractAddress, contractAbi, signer)

    console.log({
      provider,
      signer,
      vox,
    })

    return vox
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="flex flex-col items-center">
        {currentAccount ? (
            <div className="bg-gray-200 rounded-xl px-3 flex flex-row items-center">
          <p className="bg-gray-200 rounded-xl px-3">
            Currently connected with{" "}
            <span className="text-[#3ead82] hover:underline">{currentAccount}</span>
          </p>
          <AiFillCheckCircle fontSize={20} className="text-[#69b566] animate-pulse" />
          </div>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center bg-[#80e2bc] p-3 rounded-full hover:bg-[#5bc49c] hover:scale-110 transition-all"
          >
            <p className="font-semibold text-[#131212]">
              Connect with Metamask
            </p>
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gradient w-1/3 rounded-lg py-2 mt-6">
        <p className="text-[#ffffff] font-semibold text-xl mb-6">
        <span className='text-[#b7f2ee] font-semibold'>Spread</span> Your Truth
        </p>
        <textarea
          type="text"
          placeholder="Type your Vox"
          name="vox"
          onChange={handleVox}
          className="mb-2 rounded-md py-2 px-4"
        />
        <input type="number" placeholder="Enter a passcode" className="mb-2 rounded-md p-2" onChange={handlePasscode} />
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            onClick={publishVox}
            className="flex flex-row justify-center items-center bg-[#262626] px-4 py-1 rounded-xl hover:bg-[#151515] mb-2 transition-all hover:scale-105"
          >
            <p className="font-semibold text-white">Publish</p>
          </button>
        )}

     
      </div>

      <div>
        {sucess && (
          <div className="bg-gray-100 rounded-xl px-3 mt-5 flex flex-col items-center">
            <p className="flex flex-col items-center font-semibold mb-2">
              <span className="text-[#3cc02d] text-xl bg-gray-300 px-2 mt-4 rounded-md pb-1 mb-4">Success! 📣</span>Transaction number: <br />
            </p>
            <p className="text-[#3ead82] mb-4 font-semibold bg-gray-200 rounded-md px-2">
                {
                 hash.hash
                }
            </p>
            <p className="font-semibold mb-2">
                Unique ID for this vox:
            </p>
            <p className="text-4xl font-bold pb-1 px-4 mb-2 rounded-md transition-all hover:scale-110 bg-gray-300">
                {Number(identifier._hex)}
            </p>

            <p className="font-bold text-red-400 animate-pulse mb-6">⚠️ Please write down your passcode and unique ID somewhere safe! ⚠️</p>
            <button onClick={() => {navigator.clipboard.writeText(hash.hash)}}
                className='bg-gray-300 rounded-md flex flex-row items-center mb-5 hover:bg-gray-400 transition-all ease-in hover:scale-105'>
                <p className="mx-2">Copy transaction hash to clipboard</p>
                <FiClipboard fontSize={18} className="hover:animate-bounce"/>
            </button>
            <button onClick={() => {navigator.clipboard.writeText(Number(identifier._hex))}}
                className='bg-gray-300 rounded-md flex flex-row items-center mb-5 hover:bg-gray-400 transition-all ease-in hover:scale-105'>
                <p className="mx-2">Copy unique ID to clipboard</p>
                <FiClipboard fontSize={18} className="hover:animate-bounce"/>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}



export default GetStarted
