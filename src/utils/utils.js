export const priceToLocale = (price) => {
    if (isNaN(price)) {
        throw new Error('Data not a number.')
    }
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price)
}
