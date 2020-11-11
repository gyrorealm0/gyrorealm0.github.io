var playerData = [
    currency = 10,
    currencyMakers = 0,
    currencyMakerCost = 10,
    prestigePoints = 0,
    possiblePrestigePoints = 0,
    currencyUpgrades = 1,
    prestigeUpgrades = 1,
    currencyUpgradeCost = 10,
    prestigeUpgradeCost = 1000,
    currencyMultiplier = 1,
    prestigeMultiplier = 1,
    upgradeUpgrade = 1,
    upgradeUpgradeCost = 2,
    upgradeMultiplier = 1
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
    document.getElementById("currencyUpgradeCost").innerHTML = currencyUpgradeCost;
    document.getElementById("prestigeUpgradeCost").innerHTML = prestigeUpgradeCost;
    document.getElementById("upgradeUpgradeCost").innerHTML = upgradeUpgradeCost;
    
}

function save() {
    document.cookie = prestigePoints + possiblePrestigePoints;
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
    save()
}

function prestigeCheck() {
    possiblePrestigePoints = (Math.sqrt(currency + currencyMakers) / (1 + prestigePoints)) * (prestigeMultiplier) * (upgradeMultiplier);
}

function makeCurrency() {
    currency += currencyMultiplier * currencyMakers * (1 + prestigePoints) / 100;
}

function prestige() {
    prestigePoints += Math.sqrt((currency + currencyMakers) / (1 + prestigePoints)) * (prestigeMultiplier) * (upgradeMultiplier);
    currencyMakers = 0;
    currency = 0;
    currencyMakerCost = 10;
}

function load() {
    prestigePoints = parseFloat(document.cookie);
}

function upgradePrestige() {
    if(currency >= prestigeUpgradeCost) {
        currenecy -= prestigeUpgradeCost;
        prestigeUpgradeCost *= 10;
        prestigeMultiplier *= 2;
    }
}

function upgradeCurrency() {
    if(prestigePoints >= currencyUpgradeCost) {
        prestigePoints -= currencyUpgradeCost;
        currencyUpgradeCost *= 10;
        currencyMultiplier *= 2;
    }
}

function upgradeUpgrade() {
    if(currencyUpgrades >= upgradeUpgradeCost) {
        if(prestigeUpgrades >= upgradeUpgradeCost) {
            currencyUpgrades -= upgradeUpgradeCost;
            prestigeUpgrades -= upgradeUpgradeCost;
            upgradeUpgradeCost *= 5;
            upgradeMultiplier *= 2;
        }
    }
}

fixVar();

if(parseFloat(document.cookie) > 0) {
    load();
}
setInterval(updateGame, (1))