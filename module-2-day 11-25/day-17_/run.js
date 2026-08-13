const subtotal = (...prices) => prices.reduce((sum, price) => sum + price, 0);
const discountBy = (rate) => (amount) => amount * (1 - rate);

const withVat = (amount, vatRate = 0.15) => amount * (1 + vatRate);
const toETB = (amount) => `${amount.toFixed(2)} ETB`;

const makeReceiptMaker = (discountRate = 0) => {
  let orderNumber = 0;

  const applyDiscount = discountBy(discountRate);

  return (...prices) => {
    orderNumber++;

    const baseTotal = subtotal(...prices);
    const discountedTotal = applyDiscount(baseTotal);
    const finalTotal = withVat(discountedTotal);

    return `#${orderNumber}: ${toETB(finalTotal)}`;
  };
};

const generateReceipt = makeReceiptMaker(0.1);

console.log(generateReceipt(100, 200));
console.log(generateReceipt(150, 50, 100));
console.log(generateReceipt(500));
