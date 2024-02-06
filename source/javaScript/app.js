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




// function check input element handling
function checkInputHandler (e) {
    e.preventDefault();
    if (innerID.value === "" || innerTitle.value === "" || innerAuthor.value === "" || innerYear.value === "" || innerGenre.value === "") {
        Swal.fire({
            title: "Warning User!", 
            text: "You must complete the form",
            icon: "error",
        });
    } else {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "successfully",
          text: "The book has been successfully added",
          showConfirmButton: false,
          timer: 2500,
        });
    }
}







//? add event listener
// -> button add new a book to dataBase or list of books
btnAdd.addEventListener("click",checkInputHandler);