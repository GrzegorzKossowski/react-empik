import React, { useEffect, useState } from 'react'
import Status from '../status/Status'
import './product.css'
import { priceToLocale } from '../../utils/utils'


//{"pid":"8e5e1248","name":"Patelnia","price":"89.99","max":10,"min":1}

const Product = (props) => {

    const { pid, name = 'Default', price = 0, min, max, isBlocked } = props

    return (
        <li className='product-row'>
            <div className='product-cell'>
                {name}
            </div>
            <div className='product-cell'>
                cena: {priceToLocale(price)}
            </div>
            <div className='product-cell text-right'>
                <Status {...props} />
            </div>
        </li>
    )
}

export default Product