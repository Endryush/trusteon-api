export function roundMoney (value) {
  return Math.round(Number(value) * 100) / 100
}

export function getCommissionRate () {
  const rate = Number(process.env.COMMISSION_RATE ?? 0.15)
  if (!Number.isFinite(rate) || rate < 0 || rate >= 1) {
    return 0.15
  }
  return rate
}

export function splitCommission (totalAmount, rate = getCommissionRate()) {
  const total = roundMoney(totalAmount)
  const commission = roundMoney(total * rate)
  const authorAmount = roundMoney(total - commission)
  return { commission, authorAmount, rate }
}
