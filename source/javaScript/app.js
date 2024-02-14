// *Get start code javaScript project* //
// --> variables of let 
let $ = document;
let themeApp = "light";
// *variables of const*
// --> input elements selected :)
const innerID = $.querySelector(".input-id");
const innerTitle = $.querySelector(".input-title");
const innerAuthor = $.querySelector(".input-author");
const innerYear = $.querySelector(".input-year");
const innerGenre = $.querySelector(".input-genre");
// --> buttons elements clicked selected :)
const btnAdd = $.querySelector(".btn-add");
const btnClear = $.querySelector(".btn-clear");
const btnChangeTheme = $.querySelector(".btn-changeTheme");
// --> select elements change selected :)
const filterElm = $.querySelector(".filter");
// --> other elements selected :)
const countBook = $.querySelector(".count-book");
const messageDataBase = $.querySelector(".message-dataBase");
const dataBaseView = $.querySelector(".dataBase-Book");



// Create the array Book data or DataBase Book Keeper
let dataBase = [];


// function check input's application :)
function checkInputHandler () {
    let id , title , author , year , genre;
    
    id = innerID.value.trim();
    title = innerTitle.value.trim();
    author = innerAuthor.value.trim();
    year = innerYear.value.trim();
    genre = innerGenre.value.trim();
    
    if (id === "" || title === "" || author === "" || year === "" || genre === "") {
        Swal.fire({
            title: "Warning User",
            text : "Please fill out the book information form completely!",
            icon : "warning",
            iconColor : "darkorange",
            showClass : {
                popup : `
                animate__animated
                animate__fadeInUp
                animate__faster`,
            },
            hideClass: {
                popup : `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster`
            }
        })
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            iconColor : "green",
            color:"Black",
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
            showClass : {
                popup : `animate__animated
                animate__fadeInUp
                animate__faster`
            },
            hideClass : {
                popup : `animate__animated
                animate__fadeOutDown
                animate__faster`
            }
        });
        Toast.fire({
            icon: "success",
            title: "The book has been successfully added!"
        });
        // --> create data a new book
        const newDataBook = {
            idBook : id,
            titleBook : title,
            authorBook : author,
            yearBook : year,
            genreBook : genre,
            complete : false,
            remove : false,
        };
        
        // --> Push and send data a new a book to database
        dataBase.push(newDataBook);
        // --> Save data a new book to local storage Browser User 
        saveDataBaseLocalStorage(dataBase);
        // --> Status update the application 
        statusBookKeeper(dataBase);
        // --> Create a new book and append to list of books
        createNewBookHandler(dataBase);

        // focus input element set id book :)
        innerID.focus();
    }
}


// save data to local storage Browser User
function saveDataBaseLocalStorage (dataBase) {
    localStorage.setItem("listBook" , JSON.stringify(dataBase));
}


// function create a new book and append to list of book
function createNewBookHandler (dataBase) {
    let boxMain,idElm,titleElm,authorElm,yearElm,genreElm,actionElm;
    let btnComplete,btnRemove,btnLiked;

    dataBaseView.innerHTML = "";

    // --> loop for dataBase Array and Create a new book by items Array
    dataBase.forEach(function (items) {
        // --> start create a new book
        boxMain = $.createElement("tr");
        boxMain.classList = "table-striped table-hover box-main";
        
        idElm = $.createElement("td");
        idElm.className = "text-center table-dark";
        idElm.innerHTML = items.idBook;
        
        titleElm = $.createElement("td");
        titleElm.innerHTML = items.titleBook;
        
        authorElm = $.createElement("td");
        authorElm.innerHTML = items.authorBook;

        yearElm = $.createElement("td");
        yearElm.innerHTML = items.yearBook;

        genreElm = $.createElement("td");
        genreElm.innerHTML = items.genreBook;

        actionElm = $.createElement("td");
        actionElm.className = "d-flex justify-content-center align-items-center table-active";

        btnComplete = $.createElement("button");
        btnComplete.innerHTML = `<i class='fa fa-check'></i>`;
        btnComplete.className = "btn btn-sm btn-complete btn-success ms-1";

        btnRemove = $.createElement("button");
        btnRemove.innerHTML = `<i class='fa fa-trash'></i>`;
        btnRemove.className = "btn btn-sm btn-remove btn-danger ms-1";


        btnLiked = $.createElement("button");
        btnLiked.innerHTML = `<i class='fa fa-star'></i>`;
        btnLiked.className = "btn btn-sm btn-like btn-warning ms-1";


        //! --> Check status a new item book by clicking on the user :)
        if (items.complete) {
            boxMain.className = "table-success";
            boxMain.classList.add("animate__animated" , "animate__fadeInDown");
        }


        // --> append to list of books
        actionElm.append(btnComplete,btnRemove,btnLiked);
        boxMain.append(idElm,titleElm,authorElm,yearElm,genreElm,actionElm);
        // --> append main
        dataBaseView.appendChild(boxMain);
        boxMain.classList.add("animate__animated" , "animate__fadeInDown");
    });
}


// function for updating the status of the application
function statusBookKeeper (database) {
    if (dataBase.length > 0) {
        messageDataBase.remove();
    } else {
        messageDataBase.innerHTML = `No book has been added`;
    }
    
    // --> update count list books 
    countBook.innerHTML = dataBase.length;
}


// change status a book added to the list of books
function changeStatusBookHandler (e) {
    let clicked = e.target;
    let getDataBaseBook = JSON.parse(localStorage.getItem("listBook"));
    // --> get id clicked :)
    let getId = clicked.parentElement.parentElement.firstChild.innerHTML;
    dataBase = getDataBaseBook;

    // --> loop for dataBase and find the book clicked and update the status book ::)
    dataBase.forEach(function (items) {
        if (clicked.classList.contains("btn-complete")) {
            if (getId === items.idBook) {
                items.complete = !items.complete;
            }
        } else if (clicked.classList.contains("btn-remove")) {
            let findIndex = dataBase.findIndex(function (find) {
                return find.idBook === getId;
            });
            // --> Question Remove a book selected user :)
            swalQuestionRemoved(findIndex);
        }
    });

    // --> save new data book :) 
    saveDataBaseLocalStorage(dataBase);
    // --> send new data book for create and update :)
    createNewBookHandler(dataBase);
}


// function swal Question Remove a book selected user
function swalQuestionRemoved (findIndex) {
    Swal.fire({
        title: "Delete the book!",
        text: "Do you want to delete the book?",
        icon: "question",
        iconColor : "red",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Deleted!",
            text: "The selected book has been successfully deleted",
            icon: "success",
            iconColor : "green"
        });
            dataBase.splice(findIndex , 1);
            // --> save new data book :) 
            saveDataBaseLocalStorage(dataBase);
            // --> send new data book for create and update :)
            createNewBookHandler(dataBase);
        }
    });
}


// function check input app by keyboard 
function checkInputByKeyboard (e) {
    if (e.key === "Enter") {
        // check input :)
        checkInputHandler()
    }
}


// function clear all input values and list of book and clear local storage :)
function clearInputAndBooksHandler () {
    // --> Clear input values :-
    innerID.value = "";    
    innerTitle.value = "";
    innerAuthor.value = "";
    innerYear.value = "";
    innerGenre.value = "";

    // --> focus for input id 
    innerID.focus();

    // --> clear all book and clear local storage
    dataBaseView.innerHTML = "";
    dataBase = [];
    // --> clear remove items just (key listBook) of all books
    localStorage.removeItem("listBook");

    // --> update status application :)
    saveDataBaseLocalStorage(dataBase);
    createNewBookHandler(dataBase);
}



// function filter of book 
function filterBooksHandler (e) {
    const targetValue = e.target.value;
    const getDataBaseBook = JSON.parse(localStorage.getItem("listBook"));
    dataBase = getDataBaseBook;

    let filterBooks;
    if (targetValue === "All") {
        filterBooks = dataBase;
    } else if (targetValue === "Complete") {
        filterBooks = dataBase.filter(function (book) {return book.complete === true});
    } else if (targetValue === "unComplete") {
        filterBooks = dataBase.filter(function (book) {return book.complete != true});
    }


    // update app
    createNewBookHandler(filterBooks);
}






// function change theme app
function changeThemeHandler (e) {
    if (themeApp === "light") {
        darkModeThemeHandler();
        themeApp = "dark";
        localStorage.setItem("theme",themeApp);
        btnChangeTheme.innerHTML = `<i class='fa fa-sun'></i>`;
    } else {
        lightModeThemeHandler();
        themeApp = "light";
        localStorage.setItem("theme",themeApp);
        btnChangeTheme.innerHTML = `<i class='fa fa-moon'></i>`;
    }
}   

// function dark mode theme handler
function darkModeThemeHandler () {
    document.documentElement.style.setProperty("--theme-Background","#092635");
    document.documentElement.style.setProperty("--theme-Color","#fff");
}

// function dark mode theme handler
function lightModeThemeHandler () {
    document.documentElement.style.setProperty("--theme-Background","#fff");
    document.documentElement.style.setProperty("--theme-Color","#092635");
}

// function load application handler
function loadAppHandler () {
    // --> load app for part change theme application 
    // --> The theme will be dark when the page is loaded
    let getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
        changeThemeHandler();
    }

    // --> Load app for part view dataBase Books
    let getDataBaseBook = JSON.parse(localStorage.getItem("listBook"));
    dataBase = getDataBaseBook;

    if (dataBase === null) {
        dataBase = [];
    } else {
        createNewBookHandler(dataBase);
        saveDataBaseLocalStorage(dataBase);
        statusBookKeeper(dataBase);
    }
}


// add event listener for element
btnChangeTheme.addEventListener("click",changeThemeHandler);
btnAdd.addEventListener("click",checkInputHandler);
btnClear.addEventListener("click",clearInputAndBooksHandler)
dataBaseView.addEventListener("click",changeStatusBookHandler);
document.addEventListener("keyup",checkInputByKeyboard);
// document add event listener for element body or document
window.addEventListener("load",loadAppHandler);
// change element status application 
filterElm.addEventListener("change",filterBooksHandler);