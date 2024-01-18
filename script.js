const sumInput = document.querySelector("#sum");
const currencySelect = document.querySelector("#currency");
const operationSelect = document.querySelector("#operation");
const resultInputs = document.querySelectorAll("input[data-currency]");
const convertButton = document.querySelector("button");

convertButton.addEventListener("click", currencyConversion)

function currencyConversion() {
    const sumValue = sumInput.value;
    const currencyType = currencySelect.value;
    const operationValue = operationSelect.value;
    const currencies = {"kzt": 1, "usd": 429, "eur": 507};

    conversionOperation(sumValue, operationValue, currencyType, currencies);
    setResults(resultInputs, currencyType, currencies);
}

function conversionOperation(sumValue, operationValue, currencyType, currencies) {
    typeOperations(operationValue, currencies);
    switch (currencyType) {
        case "kzt":
            currencies.usd = sumValue / currencies.usd;
            currencies.eur = sumValue / currencies.eur;
            break;
        case "usd":
            currencies.kzt = sumValue * currencies.usd;
            currencies.eur = currencies.kzt / currencies.eur;
            break;
        case "eur":
            currencies.kzt = sumValue * currencies.eur;
            currencies.usd = currencies.kzt / currencies.usd;
            break;
        default:
            break;
    }
}

function typeOperations(operationValue, currencyRes) {
    if (operationValue !== "buy") {
        for (let currency in currencyRes) {
            currencyRes[currency] += 2;
        }
    }
}

function setResults(resultInputs, currencyType, currencyRes) {
    resultInputs.forEach(eachInput => {
        let eachData = eachInput.dataset.currency;
        if (eachData !== currencyType) {
            eachInput.value = currencyRes[eachData].toFixed(2);
        } else {
            eachInput.value = "-";
        }
    });
}
