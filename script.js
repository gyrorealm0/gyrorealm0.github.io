//variable init

currency = 0

//function init

function updateVar() {
    document.getElementById("currency").innerHTML = currency;
}

function save() {
    localStorage.setItem("save", currency);
}

function updateGame() {
    updateVar();
    save();
}

function load() {
    currency = (localStorage.getItem("save"));
    document.getElementById("currency").innerHTML = currency;
}

function bruh() {
    console.log("click");
    currency++;
    updateGame();
    
}

function reset() {
    localStorage.setItem("save", 0);
    currency = 0;
    console.log("reset")
    document.getElementById("currency").innerHTML = 0
}

//init calls

load();
