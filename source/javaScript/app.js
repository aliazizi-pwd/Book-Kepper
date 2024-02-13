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
const btnAdd = $.querySelector(".btnAdd");
const btnClear = $.querySelector(".btn-clear");
const btnChangeTheme = $.querySelector(".btn-changeTheme");
// --> select elements change selected :)
const filterElm = $.querySelector(".filter");
// --> other elements selected :)
const countBook = $.querySelector(".count-book");
const messageDataBase = $.querySelector(".message-dataBase");
const dataBaseView = $.querySelector(".dataBase-Book");


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
// document add event listener for element body or document
window.addEventListener("load",loadAppHandler);