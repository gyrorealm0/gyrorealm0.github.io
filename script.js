var playerData = [
    currency = 1,
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
    startCurrencyUpgrades = 1,
    startCurrencyUpgradeCost = 2000,
    time = 0,
    currencyUpgrades = 0,
    prestigeUpgrades = 0,
    test = "",
    saveArray = [0, 0, 0, 0, 0, 0, 0, 1],
    tab = "currencyMakers"	
]

function fixVar() {
    prestigePoints = 0;
    time = 0;
    currency = 0;
    possiblePrestigePoints = 0;
}

function updateVar() {
    document.getElementById("currency").innerHTML = Math.round(currency).toFixed(0);
    document.getElementById("currencyMakers").innerHTML = currencyMakers;
    document.getElementById("currencyMakerCost").innerHTML = currencyMakerCost.toFixed(2);
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

function switchTabs(newtab) {
  document.getElementById(tab).style.display = "none";
  document.getElementById(newtab).style.display = "block";
  tab = newtab;
}

function save() {
    saveArray = [prestigePoints, time, currencyUpgrades, prestigeUpgrades, upgradeUpgrades, currency, currencyMakers, startCurrency];
    localStorage.setItem("save", JSON.stringify(saveArray));
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
    upgradeUpgradeCost = 1 + Math.pow(upgradeUpgrades, 5);
    upgradeMultiplier = 1 + Math.pow(upgradeUpgrades, 2);
    prestigeUpgradeCost = 1 + Math.pow(prestigeUpgrades, 5);
    prestigeMultiplier = 1 + Math.pow(prestigeUpgrades, 2);
    currencyUpgradeCost = 1 + Math.pow(currencyUpgrades, 5);
    currencyMultiplier = 1 + Math.pow(currencyUpgrades, 2);
    currencyMakerCost = 1 + Math.pow(currencyMakers, 1.1) * 10;
    startCurrencyUpgradeCost = 1 + Math.pow(startCurrencyUpgrades, 5) * 2000;
    startCurrency = Math.pow(startCurrencyUpgrades, 10);
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
    saveArray = JSON.parse(localStorage.getItem("save"));
    prestigePoints = saveArray[0];
    time = saveArray[1];
    currencyUpgrades = saveArray[2];
    prestigeUpgrades = saveArray[3];
    upgradeUpgrades = saveArray[4];
    currency = saveArray[5];
    currencyMakers = saveArray[6];
    startCurrencyUpgrades = saveArray[7];
}

function upgradePrestige() {
    while(currency >= prestigeUpgradeCost){
        priceCheck();
        if(currency >= prestigeUpgradeCost) {
            currency -= prestigeUpgradeCost;
            prestigeUpgrades++;
        }
    }
}

function upgradeCurrency() {
    while(prestigePoints >= currencyUpgradeCost) {
        priceCheck();
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
        startCurrencyUpgrades++;
    }
}

function reset() {
    prestigePoints = 0;
    time = 0;
    currencyUpgrades = 0;
    prestigeUpgrades = 0;
    upgradeUpgrades = 0;
    currency = 0;
    currencyMakers = 0;
}

if(localStorage.getItem("save") === null) {
    localStorage.setItem("save", JSON.stringify(saveArray));
}

fixVar();
load();

setInterval(updateGame, (1000))