// URL de l'API pour récupérer les taux de change
const apiUrl =
  "https://v6.exchangerate-api.com/v6/ae45775fca423eae3ecf2372/latest/USD";
const fromCurrencySelect = document.getElementById("currency-one");
const toCurrencySelect = document.getElementById("currency-two");
const amountInput = document.getElementById("amount-one");

let rates = {};

async function fetchCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.conversion_rates) {
      rates = data.conversion_rates;
      populateCurrencySelectors();
    }
  } catch (error) {
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
    document.getElementById("amount-two").value = convertedAmount; // Mettre le montant converti dans le champ input
  } else {
    document.getElementById("amount-two").value = ""; // Effacer le champ si le montant est invalide
  }
}

amountInput.addEventListener("input", convertCurrency);
fromCurrencySelect.addEventListener("change", convertCurrency);
toCurrencySelect.addEventListener("change", convertCurrency);

fetchCurrencies();
