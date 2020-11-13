function purchase(currency, cost, max) {
    if(currency < cost) {
        return 0;
    }

    if(max == true) {
        return Math.floor(currency / cost);
    }

    return 1;
}

function purchase(currency, cost, multiplier, max) {
    if(currency < cost) {
        return 0;
    }

    if(max == true) {
        return Math.floor(Math.log(cur / cos) / Math.log(mul));
    }

    return 1;
}