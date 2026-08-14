// Exercise 1: Fetch USD -> ETB Rate
async function getUsdToEtbRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!res.ok) {
      throw new Error(`Failed to fetch rates: ${res.status}`);
    }

    const data = await res.json();
    const etbRate = data.rates.ETB;

    console.log(`1 USD = ${etbRate} ETB`);
    return etbRate;
  } catch (error) {
    console.error("Error getting exchange rate:", error.message);
  }
}

getUsdToEtbRate();
