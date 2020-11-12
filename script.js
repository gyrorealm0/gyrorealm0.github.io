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
    tab = "currencyMaker"	
]

function fixVar() {
    prestigePoints = 0;
    time = 0;
    currency = 0;
    possiblePrestigePoints = 0;
}

function purchase(cur, cos, mul) {
    if(cur < cos){
        return 0;
    }
    return Math.floor(Math.log10(cur*(mul-1)/cos + 1) / Math.log10(mul));
}

function updateVar() {
    document.getElementById("currency").innerHTML = Math.round(currency).toPrecision(3);
    document.getElementById("currencyMakers").innerHTML = currencyMakers;
    document.getElementById("currencyMakerCost").innerHTML = currencyMakerCost.toPrecision(3);
    document.getElementById("prestigePoints").innerHTML = prestigePoints.toPrecision(3);
    document.getElementById("possiblePrestigePoints").innerHTML = possiblePrestigePoints.toPrecision(3);
    document.getElementById("currencyUpgradeCost").innerHTML = currencyUpgradeCost.toPrecision(3);
    document.getElementById("prestigeUpgradeCost").innerHTML = prestigeUpgradeCost.toPrecision(3);
    document.getElementById("upgradeUpgradeCost").innerHTML = upgradeUpgradeCost.toPrecision(3);
    document.getElementById("startCurrencyUpgradeCost").innerHTML = startCurrencyUpgradeCost.toPrecision(3);
    document.getElementById("time").innerHTML= time;
    document.getElementById("currencyUpgrades").innerHTML = currencyUpgrades;
    document.getElementById("prestigeUpgrades").innerHTML = prestigeUpgrades;
    document.getElementById("upgradeUpgrades").innerHTML = upgradeUpgrades;
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

function maxAll() {
    buyCurrencyMaker();
    updateVar();
    upgradeCurrency();
    updateVar();
    upgradePrestige();
    updateVar();
    upgradeUpgrade();
}

function buyCurrencyMaker() {
    currencyMakerCost = Math.pow(1.1, currencyMakers);
    temp = purchase(currency, currencyMakerCost, 1.1);
    currencyMakers += temp;
    if(temp > 0){
        currency -= Math.pow(1.1, temp - 1) * currencyMakerCost;
    }
}

function updateGame() {
    updateVar()
    makeCurrency()
    prestigeCheck()
    priceCheck()
    save()
    time++;
    if(currency < 1){
        currency = 1;
    }
}

function priceCheck() {
    upgradeUpgradeCost = Math.ceil(Math.pow(1.1, upgradeUpgrades));
    upgradeMultiplier = 1 + Math.pow(2, upgradeUpgrades);
    prestigeUpgradeCost = Math.ceil(Math.pow(1.1, prestigeUpgrades));
    prestigeMultiplier =  1 + Math.pow(prestigeUpgrades, 2);
    currencyUpgradeCost = Math.ceil(Math.pow(1.1, currencyUpgrades));
    currencyMultiplier = 1 + Math.pow(currencyUpgrades, 2);
    currencyMakerCost = Math.pow(1.1, currencyMakers);
    startCurrencyUpgradeCost = 1 + Math.pow(startCurrencyUpgrades, 5) * 2000;
    startCurrency = Math.pow(startCurrencyUpgrades, 10);
}	

function prestigeCheck() {
    possiblePrestigePoints = (Math.sqrt(currency + currencyMakers)) * (prestigeMultiplier) * (upgradeMultiplier);
}

function makeCurrency() {
    currency += currencyMultiplier * currencyMakers * (1 + prestigePoints) / 100;
}

function prestige() {
    prestigePoints += possiblePrestigePoints;
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
    temp = purchase(currency, prestigeUpgradeCost, 1.1);
    if(temp > 0){
        prestigeUpgrades += temp;
        currency -= Math.pow(1.1, temp - 1) * prestigeUpgradeCost;
    }
}

function upgradeCurrency() {
    temp = purchase(prestigePoints, currencyUpgradeCost, 1.1);
    if(temp > 0){
        currencyUpgrades += temp;
        prestigePoints -= Math.pow(1.1, temp - 1) * currencyUpgradeCost;
    }
}

function upgradeUpgrade() {
    temp = purchase(currencyUpgrades, upgradeUpgradeCost, 1.1);
    temp2 = purchase(currencyUpgrades, upgradeUpgradeCost, 1.1);
    if(temp > 0){
        if(temp2 > 0){
        upgradeUpgrades ++;
        currencyUpgrades -= upgradeUpgradeCost);
        prestigeUpgrades -= upgradeUpgradeCost);
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

setInterval(updateGame, (1))