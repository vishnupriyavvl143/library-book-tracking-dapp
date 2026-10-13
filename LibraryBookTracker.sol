
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LibraryBookTracker {
    struct Book {
        string title;
        string author;
        bool available;
    }

    Book[] private books;

    function addBook(string memory _title, string memory _author) public {
        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_author).length > 0, "Author is required");
        books.push(Book(_title, _author, true));
    }

    function getBookCount() public view returns (uint256) {
        return books.length;
    }

    function getBook(uint256 _id)
        public
        view
        returns (string memory, string memory, bool)
    {
        require(_id < books.length, "Book does not exist");
        Book memory book = books[_id];
        return (book.title, book.author, book.available);
    }

    function updateAvailability(uint256 _id, bool _available) public {
        require(_id < books.length, "Book does not exist");
        books[_id].available = _available;
    }
}
