var playerData = [
    currency = 10,
    currencyMakers = 0,
    currencyMakerCost = 10,
    prestigePoints = 0,
    possiblePrestigePoints = 0
]

function updateVar() {
    document.getElementById("currency").innerHTML = Math.round(currency);
    document.getElementById("currencyMakers").innerHTML = currencyMakers;
    document.getElementById("currencyMakerCost").innerHTML = currencyMakerCost;
    document.getElementById("prestigePoints").innerHTML = prestigePoints.toFixed(2);
    document.getElementById("possiblePrestigePoints").innerHTML = possiblePrestigePoints.toFixed(2);
}

function getCurrency() {
    currency++;
    updateVar()
}

function buyCurrencyMaker() {
  if (currency >= currencyMakerCost) {
    currency = currency - currencyMakerCost;
    currencyMakers++;
    currencyMakerCost = Math.round(currencyMakerCost * 1.1);
    updateVar()
  }
}

function updateGame() {
    updateVar()
    makeCurrency()
    prestigeCheck()
}

function prestigeCheck() {
    possiblePrestigePoints = Math.sqrt(currency / 1000) / (1 + prestigePoints + (currency / 1000)) + Math.sqrt(currencyMakers) / 10;
}

function makeCurrency() {
    currency += Math.pow(currencyMakers, 1 + prestigePoints) / 100;
}

function prestige() {
    prestigePoints += Math.sqrt(currency / 1000) / (1 + prestigePoints + (currency / 1000)) + Math.sqrt(currencyMakers) / 10;    
    currencyMakers = 0;
    currency = 0;
    currencyMakerCost = 10;
}

setInterval(updateGame, (1))
