let ind = 0;
document.addEventListener('DOMContentLoaded', (event) => {
    const myLibrary = [];

    function Book(name, author, pages, isRead) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = function() { // Corrected syntax
            console.log(this.name);
            console.log(this.author); // Corrected typo
            console.log(this.pages);
            console.log(this.isRead);
        };
    }

    document.querySelector('#myForm').addEventListener('submit', getFormVal);

    function getFormVal(event) {
        event.preventDefault();
        const form = document.getElementById('myForm');
        const name = form.elements['name'].value;
        const author = form.elements['author'].value;
        const pages = form.elements['pages'].value;
        addBookToLibrary(name, author, pages);
        form.reset();
    }
    function addBookToLibrary(name, author, pages) {
        const b1 = new Book(name, author, pages, false);
        myLibrary.push(b1);
        const table = document.getElementById("dashboard").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        cell1.innerHTML = name;
        cell2.innerHTML = author;
        cell3.innerHTML = pages;
        cell4.innerHTML = '<button class="deleteBtn">Delete</button>';
        ind++;
        cell5.innerHTML = 'false';
        updateButton();
        const deleteButton = cell4.querySelector('.deleteBtn');
        deleteButton.addEventListener('click', function () {
            removeRow(this);
        });
        function updateButton() {
            if (cell5.innerHTML == 'false') {
                cell6.innerHTML = '<button class="readStatus">Yes</button>';
            } else {
                cell6.innerHTML = '<button class="readStatus">No</button>';
            }
        
            const statusBtn = cell6.querySelector('.readStatus');
            statusBtn.addEventListener('click', function() {
                cell5.innerHTML = (cell5.innerHTML == 'false') ? 'true' : 'false';
                updateButton(); // Reattach the event listener
            });
        }
    }

    document.querySelector('.submit').addEventListener('click', getFormVal);

    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector(".newBook");
    const closeButton = document.querySelector(".close");
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
});

function removeRow(button) {
    // Find the row containing the button and remove it
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}