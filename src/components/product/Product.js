import React, { useEffect, useState } from 'react'
import Status from '../status/Status'
import './product.css'
import { priceToLocale } from '../../utils/utils'


/**
 * Displays single product row
 * 
 * @param {object} props properties
 */
const Product = (props) => {

    const { name = 'Default', price = 0 } = props

    return (
        <div className='row d-flex align-items-center product-row'>
            <div className="col-md-3 product-name">
                {name}
            </div>
            <div className="col-md-6">
                <Status {...props} />
            </div>
            <div className="col-md-3 text-md-end">
                cena: <span className='product-price'>{priceToLocale(price)}</span>
            </div>
        </div>
    )
}

export default Product