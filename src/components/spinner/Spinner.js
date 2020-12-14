import React from 'react'
import { COMPANY_BRAND } from '../../config/config'
import './spinner.css'

/**
 * Simple spinner with company brand name.
 */
const Spinner = () => {
    return (
        <div className="spinner-square" data-spinner-brand={COMPANY_BRAND}>
            <div className="spinner-circle"></div>
        </div>
    )
}

export const DotSpinner = () => {
    return (
        <div className="spinner-ball-pulse">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner
