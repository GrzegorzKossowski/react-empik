import React from 'react'
import Status from '../status/Status'
import './product.css'
import { priceToLocale } from '../../utils/utils'

const Product = (props) => {

    const { name = 'Default', price = 0, amount, pid } = props

    return (
        <div className='product-row'>
            <div className='product-cell'>
                {name}
            </div>
            <div className='product-cell'>
                cena: {priceToLocale(price)}
            </div>
            <div className='product-cell text-right'>
                <Status {...props} />
            </div>
        </div>
    )
}

export default Product

//{"pid":"8e5e1248","name":"Patelnia","price":"89.99","max":10,"min":1}