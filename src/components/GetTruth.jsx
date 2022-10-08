import React, {useState} from 'react'
import Spinner from './Spinner'
import {FiClipboard} from 'react-icons/fi'

import { ethers } from "ethers"
import { contractAddress, contractAbi } from "../utils/constants"



function GetTruth() {

    const { ethereum } = window

    const [loading, setLoading] = useState(false)
    const [retrived, setRetrieved] = useState(false)
    const [passcode, setPasscode] = useState('')
    const [vox, setVox] = useState('')
    const [id, setID] = useState('')
    const [error, setError] = useState(false)

    const unixToDate = (unixTimetamp) => {

        unixTimetamp = Number(unixTimetamp) * 1000

        const timestamp = new Date(unixTimetamp).toString()

        
        return(
        <p className='bg-gray-200 px-2 rounded-md'>
            {timestamp}
        </p>
        )
    }


    const handlePasscode = (event) => {
        setPasscode(event.target.value)
    }

    const handleID = (event) => {
        setID(event.target.value)
    }


    const getVox = async () => {
        setLoading(true)
        try {
            

            const voxContract = getVoxContract()
            const vox = await voxContract.getVox(id, passcode)
    
            setVox(vox)
    
            console.log(vox)
    
            setRetrieved(true)
            setLoading(false)
            setError(false)

        } catch (error) {
            setError(true)
            setLoading(false)
            setRetrieved(false)
        }
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
    <div className='flex flex-col items-center justify-center'>
        <div className="flex flex-col items-center gradient2 w-1/3 rounded-lg py-2 mt-6">
        <p className="text-[#ffffff] font-semibold text-xl mb-6">
          <span className='text-[#ffc8ce] font-semibold'>Seek</span> Your Truth
        </p>
        <input
          type="number"
          placeholder="Enter a unique ID"
          className="mb-2 rounded-md px-2"
          onChange={handleID}
        />
        <input type="number" placeholder="Enter a passcode" className="mb-2 rounded-md p-2" onChange={handlePasscode} />
        {loading ? (
          <Spinner />
        ) : (
          <button
            type="button"
            onClick={getVox}
            className="flex flex-row justify-center items-center bg-[#262626] px-4 py-1 rounded-xl hover:bg-[#151515] mb-2 transition-all hover:scale-105"
          >
            <p className="font-semibold text-white">Retrieve</p>
          </button>
        )}
    </div>

    {error && (
        <div>
            <p className="flex flex-col items-center font-semibold  bg-gray-100 px-2 mt-4 rounded-md pb-1 mb-4">
            <span className="text-red-500 text-xl">Error ❌</span>
            <span className='text-red-500 animate-pulse'>⚠️ Invalid ID and passcode combination ⚠️</span>
            </p>

        </div>
    )}

    {retrived && (
          <div className="bg-gray-100 rounded-xl px-3 mt-5 flex flex-col items-center">
            <p className="flex flex-col items-center font-semibold">
            <span className="text-[#3cc02d] text-xl bg-gray-300 px-2 mt-4 rounded-md pb-1 mb-4">Success! 📣</span>
            </p>

            <textarea className="mb-2 rounded-md py-2 px-4">{vox[1]}</textarea>
            <p className='font-semibold'>Published on:</p>
            {/* <p className='bg-gray-200 px-2 rounded-md'>{unixToDate(vox[2]._hex)}</p> */}
            {unixToDate(vox[2]._hex)}
        

            <button onClick={() => {navigator.clipboard.writeText(vox[1])}}
                className='bg-gray-300 rounded-md flex flex-row items-center my-5 hover:bg-gray-400 transition-all ease-in hover:scale-105'>
                <p className="mx-2">Copy Vox to Clipboard</p>
                <FiClipboard fontSize={18} className="hover:animate-bounce"/>
            </button>
           
          </div>
        )}
    </div>
  )
}

export default GetTruth