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
        
        // dave data book to local storage browser user :)
        saveDataBookLocalStorage(bookList);
    }
}



// function save data book to local storage :)
function saveDataBookLocalStorage (bookList) {
    localStorage.setItem("Books" , JSON.stringify(bookList));
}



//? add event listener
// -> button add new a book to dataBase or list of books :)
btnAdd.addEventListener("click",checkInputHandler);