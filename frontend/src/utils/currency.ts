export const formatCurrencyNumber = (number: number) => {
  const options = {
    style: 'currency',
    currency: 'PEN',
  }
  let PESoles = new Intl.NumberFormat('es-PE', options)
  return PESoles.format(number)
}