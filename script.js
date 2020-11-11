var playerData = [
    currency = 0,
    currencyMakers = 0,
    currencyMakerCost = 10,
    prestigePoints = 0,
    possiblePrestigePoints = 0,	
    currencyUpgradeCost = 10,
    prestigeUpgradeCost = 1000,
    currencyMultiplier = 1,
    prestigeMultiplier = 1,
    upgradeUpgradeCost = 1,
    upgradeMultiplier = 1,
    upgradeUpgrades = 0,
    startCurrency = 1,
    startCurrencyUpgradeCost = 2000,
    time = 0,
    currencyUpgrades = 0,
    prestigeUpgrades = 0,
    test = "",
    saveArray = [0, 0, 0, 0, 0, 0, 0]
]

function fixVar() {
    prestigePoints = 0;
    time = 0;
    currency = 0;
    possiblePrestigePoints = 0;
}

function updateVar() {
    document.getElementById("currency").innerHTML = Math.round(currency);
    document.getElementById("currencyMakers").innerHTML = currencyMakers;
    document.getElementById("currencyMakerCost").innerHTML = currencyMakerCost;
    document.getElementById("prestigePoints").innerHTML = prestigePoints.toFixed(2);
    document.getElementById("possiblePrestigePoints").innerHTML = possiblePrestigePoints.toFixed(2);
    document.getElementById("currencyUpgradeCost").innerHTML = currencyUpgradeCost;
    document.getElementById("prestigeUpgradeCost").innerHTML = prestigeUpgradeCost;
    document.getElementById("upgradeUpgradeCost").innerHTML = upgradeUpgradeCost;
    document.getElementById("startCurrencyUpgradeCost").innerHTML = startCurrencyUpgradeCost;
    document.getElementById("time").innerHTML= time;
    document.getElementById("currencyUpgrades").innerHTML = currencyUpgrades;
    document.getElementById("prestigeUpgrades").innerHTML = prestigeUpgrades;
}

function save() {
    saveArray = [prestigePoints, time, currencyUpgrades, prestigeUpgrades, upgradeUpgrades, currency, currencyMakers];
    document.cookie = JSON.stringify(saveArray);
}

function getCurrency() {
    currency++;
    updateVar()
}

function buyCurrencyMaker() {
    while(currency >= currencyMakerCost) {
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
    priceCheck()
    save()
    time++;
}

function priceCheck() {
    upgradeUpgradeCost = Math.pow(upgradeUpgrades, 2);
    upgradeMultiplier = Math.pow(upgradeUpgrades, 2);
    prestigeUpgradeCost = Math.pow(prestigeUpgrades, 3);
    prestigeMultiplier = Math.pow(prestigeUpgrades, 2);
    currencyUpgradeCost = Math.pow(currencyUpgrades, 3);
    currencyMultiplier = Math.pow(currencyUpgrades, 2);
    currencyMakerCost = Math.pow(1.1, currencyMakers) * 10;
}

function prestigeCheck() {
    possiblePrestigePoints = (Math.sqrt(currency + currencyMakers) / (1 + prestigePoints)) * (prestigeMultiplier) * (upgradeMultiplier);
}

function makeCurrency() {
    currency += currencyMultiplier * currencyMakers * (1 + prestigePoints) / 100;
}

function prestige() {
    prestigePoints += (Math.sqrt(currency + currencyMakers) / (1 + prestigePoints)) * (prestigeMultiplier) * (upgradeMultiplier);
    currencyMakers = 0;
    currency = 0 + startCurrency;
    currencyMakerCost = 10;
}

function load() {
    saveArray = JSON.parse(document.cookie)
    prestigePoints = saveArray[0];
    time = saveArray[1];
    currencyUpgrades = saveArray[2];
    prestigeUpgrades = saveArray[3];
    upgradeUpgrades = saveArray[4];
    currency = saveArray[5];
    currencyMakers = saveArray[6];
}

function upgradePrestige() {
    while(currency > prestigeUpgradeCost){
        if(currency >= prestigeUpgradeCost) {
            currency -= prestigeUpgradeCost;
            prestigeUpgrades++;
        }
    }
}

function upgradeCurrency() {
    while(prestigePoints > currencyUpgradeCost) {
        if(prestigePoints >= currencyUpgradeCost) {
            prestigePoints -= currencyUpgradeCost;
            currencyUpgrades++;
        }
    }
}

function upgradeUpgrade() {
    if(currencyUpgrades >= upgradeUpgradeCost) {
        if(prestigeUpgrades >= upgradeUpgradeCost) {
            currencyUpgrades -= upgradeUpgradeCost;
            prestigeUpgrades -= upgradeUpgradeCost;
            upgradeUpgrades++;
        }
    }
}

function upgradeStartCurrency() {
    if(time > startCurrencyUpgradeCost) {
        startCurrency *= 10;
        startCurrencyUpgradeCost *= 5;
    }
}

if(document.cookie.indexOf('cookie_name=') == -1) {
    document.cookie = JSON.stringify(saveArray);
}

fixVar();
load();

setInterval(updateGame, (1))