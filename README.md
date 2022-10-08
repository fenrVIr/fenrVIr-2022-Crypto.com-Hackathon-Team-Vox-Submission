# Vox.
Don't let anyone censor you. A blockchain-based message board to broadcast your voice across the world.

![]https://youtu.be/7t-CGJFgvV0

## Description
Vox is a blockchain-based message board. Enter your Vox message into the text box and set a passcode for it. Publish the message using your Metamask account. A unique ID will be displayed. Now, send the passcode and unique ID to your listeners.

To hear someone's Vox message, enter the unique ID and passcode they have set in the respective fields. Their Vox message will then be displayed.

# Getting Started

## Important Information

The entire project runs on the Goerli testnet. That's also where the smart contract is deployed via hardhat. I have provided the address of the deployed contract in the client side files, so you don't have to worry about deploying it from scratch when testing. You can find the Vox.sol file that contains all the code for the smart contract used in the project. The files that were compiled by hardhat were not included as they aren't necessary for testing purposes (the contract's abi is provided in src/utils).


## Installation and testing

A step by step series of examples that tell you how to get a development env running.

There are two main parts that need to be considered. The client side and the smart contract.

For the client side, clone the repo and run:

```
npm install
npm install -D tailwindcss postcss autoprefixer
npm run start
```

There is no need to worry about the smart contract side as the contract has already been deployed for testing purposes on the Goerli testnet. The code for the backend can be found on the smart contract branch of the repo.


## Authors
Yaromir, Yih Reng, Darryl

## Acknowledgement
- 3D Megaphone Model -- Ethan Simon Law
https://polyhaven.com/a/Megaphone_01

![](https://github.com/fenrVIr/fenrVIr-2022-Crypto.com-Hackathon-Team-Vox-Submission/blob/b484c01cafd3b22480004c3e1fae26be7153afb2/2022-10-08%2019-49-28.gif)

