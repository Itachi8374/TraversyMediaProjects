// Create Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class
class UI{
    static displayBooks(){

        const books = Store.getBooks(); 
        books.forEach((book) => {UI.addToBookList(book);})
    }

    static addToBookList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <tr> 
            <td> ${book.title}</td>
            <td> ${book.author}</td>
            <td class="book-isbn"> ${book.isbn}</td>
            <td><button type="button" class="delete"> Delete </button> </td>
        </tr>
        `
        list.appendChild(row);
    }

    static removeBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearField(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//store class: handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn.trim() == isbn.trim()){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

//Event: add book
document.querySelector('#add-book').addEventListener('click', (e)=> {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const book = new Book(title, author, isbn);
    UI.addToBookList(book);
    Store.addBook(book);
    UI.clearField();
});

//Event: remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
    const isbn = e.target.parentElement.parentElement.getElementsByClassName('book-isbn')[0].innerHTML;
    Store.removeBook(isbn);
    UI.removeBook(e.target);
})