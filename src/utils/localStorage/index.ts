export function saveSelectedCurrencies(selectedCurrencies: number[]) {
  localStorage.setItem(
    "selectedCurrencies",
    JSON.stringify(selectedCurrencies)
  );
}

export function getSelectedCurrencies() {
  const selectedCurrencies = localStorage.getItem("selectedCurrencies");
  return selectedCurrencies ? JSON.parse(selectedCurrencies) : [];
}

export function addCurrencyToSelected(currencyId: number) {
  const selectedCurrencies = getSelectedCurrencies();
  if (!selectedCurrencies.includes(currencyId)) {
    selectedCurrencies.push(currencyId);
    saveSelectedCurrencies(selectedCurrencies);
  }
}

export function removeCurrencyFromSelected(currencyId: number) {
  const selectedCurrencies = getSelectedCurrencies();
  const updatedCurrencies = selectedCurrencies.filter(
    (id: number) => id !== currencyId
  );
  saveSelectedCurrencies(updatedCurrencies);
}
