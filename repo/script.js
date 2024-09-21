// URL de l'API pour récupérer les taux de change
const apiUrl =
  "https://v6.exchangerate-api.com/v6/21827dcf62df602b29da6911/latest/USD";
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

let rates = {};

// Fonction pour récupérer les taux de change via fetch
async function fetchCurrencies() {
  try {
    // Effectuer la requête GET via fetch
    const response = await fetch(apiUrl);
    const data = await response.json(); // Convertir la réponse en JSON

    if (data.conversion_rates) {
      rates = data.conversion_rates; // Stocker les taux de change dans 'rates'
      populateCurrencySelectors(); // Remplir les listes déroulantes
    }
  } catch (error) {
    resultDiv.textContent = "Erreur lors de la récupération des devises.";
    console.error("Erreur lors du fetch:", error);
  }
}

// Fonction pour remplir les listes déroulantes des devises
function populateCurrencySelectors() {
  const currencies = Object.keys(rates); // Obtenir les clés des devises

  currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.textContent = currency;
    fromCurrencySelect.appendChild(optionFrom); // Ajouter à la liste "from-currency"

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.textContent = currency;
    toCurrencySelect.appendChild(optionTo); // Ajouter à la liste "to-currency"
  });
}

// Fonction pour effectuer la conversion des devises
function convertCurrency() {
  const amount = parseFloat(amountInput.value); // Récupérer le montant saisi
  const fromCurrency = fromCurrencySelect.value; // Devises d'origine
  const toCurrency = toCurrencySelect.value; // Devises cible

  // Vérifier si le montant est valide et les devises sélectionnées
  if (!isNaN(amount) && fromCurrency && toCurrency) {
    const conversionRate = rates[toCurrency] / rates[fromCurrency]; // Calculer le taux de conversion
    const convertedAmount = (amount * conversionRate).toFixed(2); // Calculer le montant converti
    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`; // Afficher le résultat
  } else {
    resultDiv.textContent = "Veuillez entrer un montant valide."; // Message d'erreur
  }
}

// Ajout des écouteurs d'événements pour la conversion
amountInput.addEventListener("input", convertCurrency);
fromCurrencySelect.addEventListener("change", convertCurrency);
toCurrencySelect.addEventListener("change", convertCurrency);

// Charger les devises au démarrage
fetchCurrencies();
