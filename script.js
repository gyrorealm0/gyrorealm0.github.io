var playerData = [
    currency = 10,
    currencyMakers = 0,
    currencyMakerCost = 10,
    prestigePoints = 0,
    possiblePrestigePoints = 0
]

function fixVar() {
    prestigePoints = 0;
    possiblePrestigePoints = 0;
}

function updateVar() {
    document.getElementById("currency").innerHTML = Math.round(currency);
    document.getElementById("currencyMakers").innerHTML = currencyMakers;
    document.getElementById("currencyMakerCost").innerHTML = currencyMakerCost;
    document.getElementById("prestigePoints").innerHTML = prestigePoints.toFixed(2);
    document.getElementById("possiblePrestigePoints").innerHTML = possiblePrestigePoints.toFixed(2);
}

function save() {
    document.cookie = prestigePoints + possiblePrestigePoints;
}

function getCurrency() {
    currency++;
    updateVar()
}

function buyCurrencyMaker() {
    while(currency > currencyMakerCost) {
        if (currency >= currencyMakerCost) {
        currency = currency - currencyMakerCost;
        currencyMakers++;
        currencyMakerCost = Math.round(currencyMakerCost * 1.1);
        updateVar()
        }
    }
}

function updateGame() {
    updateVar()
    makeCurrency()
    prestigeCheck()
    save()
}

function prestigeCheck() {
    possiblePrestigePoints = Math.sqrt(currency + currencyMakers) / (1 + prestigePoints);
}

function makeCurrency() {
    currency += currencyMakers * prestigePoints / 100;
}

function prestige() {
    prestigePoints += Math.sqrt(currency + currencyMakers) / (1 + prestigePoints);
    currencyMakers = 0;
    currency = 0;
    currencyMakerCost = 10;
}

function load() {
    prestigePoints = parseFloat(document.cookie);
}

fixVar();

if(parseFloat(document.cookie) > 0) {
    load();
}
setInterval(updateGame, (1))