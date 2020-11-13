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
    saveArray = [0, 0, 0, 0, 0, 1, 0, 1],
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
    if(cur < cos * mul + cos){
        return 1;
    }
    return Math.floor(Math.log(cur / cos) / Math.log(mul));
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
    document.getElementById("time").innerHTML= Math.floor(time / 250);
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
    temp = purchase(currency, currencyMakerCost, 1.1);
    if(temp > 0){
    currencyMakers += temp;
    currency -= lose(temp, currencyMakerCost, 1.1);
    }
}

function updateGame() {
    updateVar()
    makeCurrency()
    prestigeCheck()
    priceCheck();
    save();
    time++;
    if(currency < 1){
        currency =	 1;
    }
}

function priceCheck() {
    upgradeUpgradeCost = Math.ceil(Math.pow(1.1, upgradeUpgrades));
    upgradeMultiplier = 1 + Math.pow(1.1, upgradeUpgrades);
    prestigeUpgradeCost = Math.ceil(Math.pow(1.1, prestigeUpgrades));
    prestigeMultiplier =  1 + Math.pow(prestigeUpgrades, 1.1);
    currencyUpgradeCost = Math.ceil(Math.pow(1.1, currencyUpgrades));
    currencyMultiplier = 1 + Math.pow(currencyUpgrades, 1.1);
    currencyMakerCost = Math.pow(1.1, currencyMakers);
    startCurrencyUpgradeCost = 1 + Math.pow(startCurrencyUpgrades, 5) * 2000;
    startCurrency = Math.pow(startCurrencyUpgrades, 10);
}	

function prestigeCheck() {
    possiblePrestigePoints = (Math.sqrt(currency + currencyMakers)) * (prestigeMultiplier) * (upgradeMultiplier);
}

function makeCurrency() {
    currency += currencyMultiplier * currencyMakers * prestigePoints;
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
        currency -= lose(temp, prestigeUpgradeCost, 1.1);
    }
}

function upgradeCurrency() {
    temp = purchase(prestigePoints, currencyUpgradeCost, 1.1);
    if(temp > 0){
        currencyUpgrades += temp;
        prestigePoints -= lose(temp, currencyUpgradeCost, 1.1);
    }
}

function lose(num, cos, mul) {
    return cos * ((1 - mul * num) / (1 - mul));
}

function upgradeUpgrade() {
    temp = currencyUpgrades - upgradeUpgradeCost;
    temp2 = prestigeUpgrades - upgradeUpgradeCost;
    if(temp >= 0){
        if(temp2 >= 0){
        upgradeUpgrades ++;
        currencyUpgrades -= upgradeUpgradeCost;
        prestigeUpgrades -= upgradeUpgradeCost;
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