
const CONTRACT_ADDRESS = "0x48bfD7b23dE35DbACD16b089073AFA7bE84839e5";

const CONTRACT_ABI = [
    "function addBook(string _title, string _author) public",
    "function getBookCount() public view returns (uint256)",
    "function getBook(uint256 _id) public view returns (string, string, bool)",
    "function updateAvailability(uint256 _id, bool _available) public"
];

const SEPOLIA_CHAIN_ID = "0xaa36a7";

let provider;
let signer;
let contract;

const connectBtn = document.getElementById("connectBtn");
const refreshBtn = document.getElementById("refreshBtn");
const bookForm = document.getElementById("bookForm");
const walletStatus = document.getElementById("walletStatus");
const networkStatus = document.getElementById("networkStatus");
const message = document.getElementById("message");
const bookCount = document.getElementById("bookCount");
const bookList = document.getElementById("bookList");

function showMessage(text) {
    message.textContent = text;
}

async function connectWallet() {
    try {
        if (!window.ethereum) {
            showMessage("Please install MetaMask in this Chrome profile.");
            return;
        }

        if (CONTRACT_ADDRESS.includes("PASTE_YOUR")) {
            showMessage("Please add your full deployed contract address in app.js first.");
            return;
        }

        await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        provider = new ethers.BrowserProvider(window.ethereum);

        const network = await provider.getNetwork();

        if (network.chainId !== 11155111n) {
            networkStatus.textContent = "Please switch MetaMask to Sepolia.";
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SEPOLIA_CHAIN_ID }]
            });
            provider = new ethers.BrowserProvider(window.ethereum);
        }

        signer = await provider.getSigner();

        contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        const address = await signer.getAddress();

        walletStatus.textContent =
            "Connected: " + address.slice(0, 6) + "..." + address.slice(-4);

        networkStatus.textContent = "Network: Sepolia";

        showMessage("Wallet connected successfully!");

        await loadBooks();
    } catch (error) {
        showMessage("Connection failed: " + error.message);
    }
}

async function loadBooks() {
    if (!contract) {
        showMessage("Please connect MetaMask first.");
        return;
    }

    try {
        bookList.textContent = "Loading books...";

        const count = await contract.getBookCount();

        bookCount.textContent = "Total books: " + count.toString();
        bookList.replaceChildren();

        if (count === 0n) {
            bookList.textContent = "No books found.";
            return;
        }

        for (let i = 0n; i < count; i++) {
            const book = await contract.getBook(i);

            const card = document.createElement("div");
            card.className = "book";

            const title = document.createElement("h3");
            title.textContent = book[0];

            const author = document.createElement("p");
            author.textContent = "Author: " + book[1];

            const status = document.createElement("p");
            status.textContent = book[2] ? "Available" : "Not available";
            status.className = book[2] ? "available" : "unavailable";

            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = book[2]
                ? "Mark as Unavailable"
                : "Mark as Available";

            toggleBtn.addEventListener("click", async () => {
                try {
                    toggleBtn.disabled = true;

                    const tx = await contract.updateAvailability(i, !book[2]);

                    showMessage("Please confirm the transaction and wait...");
                    await tx.wait();

                    showMessage("Book availability updated!");
                    await loadBooks();
                } catch (error) {
                    showMessage("Update failed: " + error.message);
                    toggleBtn.disabled = false;
                }
            });

            card.append(title, author, status, toggleBtn);
            bookList.appendChild(card);
        }
    } catch (error) {
        bookList.textContent = "Could not load books.";
        showMessage("Read failed: " + error.message);
    }
}

bookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contract) {
        showMessage("Connect MetaMask first.");
        return;
    }

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();

    if (!title || !author) {
        showMessage("Enter both the title and author.");
        return;
    }

    try {
        const tx = await contract.addBook(title, author);

        showMessage("Transaction submitted. Confirm it in MetaMask and wait...");
        await tx.wait();

        showMessage("Book added successfully!");
        bookForm.reset();

        await loadBooks();
    } catch (error) {
        showMessage("Could not add book: " + error.message);
    }
});

connectBtn.addEventListener("click", connectWallet);
refreshBtn.addEventListener("click", loadBooks);

if (window.ethereum) {
    window.ethereum.on("chainChanged", () => window.location.reload());
    window.ethereum.on("accountsChanged", () => window.location.reload());
}
