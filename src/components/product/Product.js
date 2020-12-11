import React from 'react'
import './product.css'

const priceToLocale = (price) => {
    if (isNaN(price)) {
        throw new Error('Data not a number.')
    }
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price)
}

const Product = ({ name = 'Default', price = 0 }) => {
    return (
        <li className='row'>
            {name}, cena: {priceToLocale(price)} | [+] [-] Obecnie masz X sztuk produktu
        </li>
    )
}

export default Product

//{"pid":"8e5e1248","name":"Patelnia","price":"89.99","max":10,"min":1}