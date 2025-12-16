export function formatAmount(amount: number) {
  if (amount >= 100000 && amount < 10000000) {
    return `₹${trim(amount / 100000)}L`;
  } else if (amount >= 10000000) {
    return `₹${trim(amount / 10000000)}Cr`;
  } else {
    return `₹${amount}`;
  }
}

function trim(n: number) {
  return n.toFixed(2).replace(/\.00$/, "");
}
