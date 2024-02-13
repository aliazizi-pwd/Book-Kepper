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
        };
        
        // --> Push and send data a new a book to database
        dataBase.push(newDataBook);
        // --> Save data a new book to local storage Browser User 
        saveDataBaseLocalStorage(dataBase);
        // --> Create a new book and append to list of books
        createNewBookHandler(dataBase);
    }
}


// save data to local storage Browser User
function saveDataBaseLocalStorage (dataBase) {
    localStorage.setItem("listBook" , JSON.stringify(dataBase));
}


// function create a new book and append to list of book
function createNewBookHandler (dataBase) {
    
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
    document.documentElement.style.setProperty("--theme-Background","#000");
    document.documentElement.style.setProperty("--theme-Color","#fff");
}

// function dark mode theme handler
function lightModeThemeHandler () {
    document.documentElement.style.setProperty("--theme-Background","#fff");
    document.documentElement.style.setProperty("--theme-Color","#000");
}

// function load application handler
function loadAppHandler () {
    // --> load app for part change theme application 
    // --> The theme will be dark when the page is loaded
    let getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
        changeThemeHandler();
    }
}


// add event listener for element
btnChangeTheme.addEventListener("click",changeThemeHandler);
btnAdd.addEventListener("click",checkInputHandler);
// document add event listener for element body or document
window.addEventListener("load",loadAppHandler);