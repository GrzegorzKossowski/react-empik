export const DEBOUNCE_TIMEOUT = 1000

export const priceToLocale = (price) => {
    if (isNaN(price)) {
        throw new Error('Data not a number.')
    }
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price)
}

export function debounce(callback, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            callback.apply(context, args)
        }, wait);
    };
}

