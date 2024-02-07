// get start code javascript from project directory book management
// variable of let
let $ = document;
// variable of const 
const innerID = $.querySelector(".input-id");
const innerTitle = $.querySelector(".input-title");
const innerAuthor = $.querySelector(".input-author");
const innerYear = $.querySelector(".input-year");
const innerGenre = $.querySelector(".input-genre");
// message input element
const messageID = $.querySelector(".message-ID");
const messageTitle = $.querySelector(".message-title");
const messageAuthor = $.querySelector(".message-author");
const messageYear = $.querySelector(".message-year");
const messageGenre = $.querySelector(".message-genre");
const messageDataBase = $.querySelector(".message-dataBase");
// dataBase Book management 
const dataBaseBook = $.querySelector(".dataBase-Book");
// button event listeners
const btnAdd = $.querySelector(".btn-add");
const btnClear = $.querySelector(".btn-add");
const btnChangeTheme = $.querySelector(".btn-changeTheme");
// select event listeners
const filterElm = $.querySelector(".filter");



// Create array list data book or dataBase book :)
let bookList = [];


// function check input element handling :)
function checkInputHandler (e) {
    let idValue , titleValue , authorValue , yearValue , genreValue;
    idValue = innerID.value.trim();
    titleValue = innerTitle.value.trim();
    authorValue = innerAuthor.value.trim();
    yearValue = innerYear.value.trim();
    genreValue = innerGenre.value.trim();

    if (idValue === "" || titleValue === "" || authorValue === "" || yearValue === "" || genreValue === "") {
        swal.fire({
            title : "Error User",
            text : "You must complete the form",
            icon : "error",
        })
    } else {
        // Create Object data book :)
        const newDataBook = {
            id : idValue,
            title : titleValue,
            author : authorValue,
            year : yearValue,
            genre : genreValue,
            complete : false,
        };

        // send or push data to array main data base book :)
        bookList.push(newDataBook);
        
        // Save data book to local storage browser user :)
        saveDataBookLocalStorage(bookList);
        // Create new a book 
        createBookHandler();
    }
}



// function save data book to local storage :)
function saveDataBookLocalStorage (bookList) {
    localStorage.setItem("Books" , JSON.stringify(bookList));
}


// function create a new book and append book to list :)
function createBookHandler () {
    let receiveDataBook = JSON.parse(localStorage.getItem("Books"));
    let boxMain , contentId , contentTitle , contentAuthor , contentYear , contentGenre , contentActions;
    let btnComplete , btnTrash;
    bookList = receiveDataBook;

    bookList.forEach(function (book) {
        boxMain = $.createElement("tr");

        contentId = $.createElement("td");
        contentId.innerHTML = book.id;
        contentId.className = "text-center table-active";

        contentTitle = $.createElement("td");
        contentTitle.innerHTML = book.title;

        contentAuthor = $.createElement("td");
        contentAuthor.innerHTML = book.author;

        contentYear = $.createElement("td");
        contentYear.innerHTML = book.year;

        contentGenre = $.createElement("td");
        contentGenre.innerHTML = book.genre;

        contentActions = $.createElement("td");
        contentActions.classList.add("text-center");

        btnComplete = $.createElement("button");
        btnComplete.innerHTML = `<i class="fa fa-check"></i>`;
        btnComplete.className = "btn btn-sm btn-success ms-1";

        btnTrash = $.createElement("button");
        btnTrash.innerHTML = `<i class="fa fa-trash"></i>`;
        btnTrash.className = "btn btn-sm btn-danger ms-1";


        contentActions.append(btnComplete,btnTrash);
        boxMain.append(contentId,contentTitle,contentAuthor,contentYear,contentGenre,contentActions);
        dataBaseBook.appendChild(boxMain);
    });
}



//? add event listener
// -> button add new a book to dataBase or list of books :)
btnAdd.addEventListener("click",checkInputHandler);