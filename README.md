# Library Book Tracking DApp

## 1. Project Overview

Library Book Tracking DApp is a simple decentralized application (DApp) developed using Solidity and a web frontend. It allows users to add library books, view book details, and update book availability on the Ethereum Sepolia test network.

## 2. Features

- Connect MetaMask wallet.
- Add a book with its title and author.
- View the total number of books.
- Display book details and availability.
- Update a book's availability status.
- Interact with a smart contract deployed on Sepolia testnet.

## 3. Technologies Used

- **Solidity** – Smart contract development
- **HTML** – Web page structure
- **CSS** – Website styling
- **JavaScript** – Frontend functionality
- **Ethers.js** – Blockchain interaction
- **MetaMask** – Wallet connection
- **Remix IDE** – Smart contract compilation and deployment
- **Ethereum Sepolia** – Test network

## 4. Smart Contract Details

**Network:** Ethereum Sepolia Testnet

**Contract Address:**
`0x48bfD7b23dE35DbACD16b089073AFA7bE84839e5`

## 5. Project Files

- `index.html` – Website structure
- `style.css` – Website design
- `app.js` – Wallet connection and smart contract interaction
- `LibraryBookTracker.sol` – Solidity smart contract
- `README.md` – Project documentation

## 6. How to Run the Project

1. Install Google Chrome and the MetaMask browser extension.
2. Connect MetaMask to the Sepolia test network.
3. Get Sepolia test ETH for transaction fees.
4. Open the project folder in Visual Studio Code.
5. Open the terminal inside the project folder.
6. Run the following command:

   ```bash
   python -m http.server 5500
   ```

7. Open this URL in Chrome:

   `http://127.0.0.1:5500/index.html`

8. Click the wallet connection button and approve the connection in MetaMask.
9. Add books and update their availability.

## 6. Steps to Deploy the Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new Solidity file named `LibraryBookTracker.sol`.
3. Copy the smart contract code from this repository into the file.
4. Compile the contract using Solidity compiler version `0.8.20` or a compatible version.
5. Install and open the MetaMask browser extension.
6. Select the **Sepolia Test Network** in MetaMask and ensure the wallet has Sepolia test ETH for transaction fees.
7. In Remix, open the **Deploy & Run Transactions** panel.
8. Select **Injected Provider - MetaMask** as the environment and approve the wallet connection.
9. Verify that the selected network is Sepolia.
10. Select `LibraryBookTracker` from the contract dropdown and click **Deploy**.
11. Confirm the deployment transaction in MetaMask.
12. After deployment, copy the contract address and use it in the frontend JavaScript file (`app.js`).

**Note:** The contract address in this repository refers to the deployed instance used for this project. If you deploy a new instance, update the address in `app.js` and `README.md` accordingly.

## 7. How It Works

The user connects a MetaMask wallet to the website. The frontend communicates with the deployed Solidity smart contract. Users can add books, view stored book details, and update whether a book is available. Blockchain transactions may require Sepolia test ETH.

## 8. Network Information

This project uses the Sepolia test network for educational and demonstration purposes. The test ETH used on Sepolia is not real money.

## 9. Future Improvements

- Search books by title or author.
- Add book categories.
- Add user roles for librarians and readers.
- Improve the interface and error handling.

## 10. Conclusion

The Library Book Tracking DApp demonstrates how a simple library management feature can interact with a blockchain smart contract through a web interface and MetaMask.
