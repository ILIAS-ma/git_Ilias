
const apiUrl =
  "https://v6.exchangerate-api.com/v6/21827dcf62df602b29da6911/latest/USD";
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

let rates = {};


async function fetchCurrencies() {
  try {
    // Effectuer la requête GET via fetch
    const response = await fetch(apiUrl);
    const data = await response.json(); 

    if (data.conversion_rates) {
      rates = data.conversion_rates; 
      populateCurrencySelectors(); 
    }
  } catch (error) {
    resultDiv.textContent = "Erreur lors de la récupération des devises.";
    console.error("Erreur lors du fetch:", error);
  }
}


function populateCurrencySelectors() {
  const currencies = Object.keys(rates); 

  currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrencySelect.appendChild(optionFrom); 

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrencySelect.appendChild(optionTo); 
  });
}


function convertCurrency() {
  const amount = parseFloat(amountInput.value); 
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value; 

  if (!isNaN(amount) && fromCurrency && toCurrency) {
    const conversionRate = rates[toCurrency] / rates[fromCurrency]; 
    const convertedAmount = (amount * conversionRate).toFixed(2); 
    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`; 
  } else {
    resultDiv.textContent = "Veuillez entrer un montant valide."; 
  }
}


amountInput.addEventListener("input", convertCurrency);
fromCurrencySelect.addEventListener("change", convertCurrency);
toCurrencySelect.addEventListener("change", convertCurrency);


fetchCurrencies();
