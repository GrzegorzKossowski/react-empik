/**
 * Converts dot float value from DB (00.00) to locale currency format
 * in that case PLN default (00,00 zl)
 * 
 * @param {number} price actual price of product
 * @param {string} locale user language zone
 * @param {string} price currency type
 */
export const priceToLocale = (price, locale = 'pl-PL', currency = 'PLN') => {
    if (isNaN(price)) {
        throw new Error('Data not a number.')
    }
    return new Intl.NumberFormat(`${locale}`, { style: 'currency', currency: `${currency}` })
        .format(price)
}