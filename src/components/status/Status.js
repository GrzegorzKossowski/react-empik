import React, { useEffect } from 'react'
//redux
import { useDispatch, useSelector } from "react-redux";
import { incrementAmount, decrementAmount, resetAmountToMin } from '../../redux/cart/cart-actions'
import { debounce, DEBOUNCE_TIMEOUT } from '../../utils/utils'
import { useDebounce } from '../../utils/useDebounce'

import './status.css'

const prularizeForm = (amount) => {
    return amount > 4 ? "sztuk" : amount > 1 ? "sztuki" : "sztukę"
}

const Status = (props) => {

    const { amount, pid, min, max, isBlocked = false } = props
    const dispatch = useDispatch()

    const __handleIncrement = debounce(
        function () {
            return // skąd się to wzięło???
        }, DEBOUNCE_TIMEOUT
    )

    const handleIncrement = () => {
        debouncedSearchTerm
        dispatch(incrementAmount(pid))
    }

    const handleDecrement = () => {
        dispatch(decrementAmount(pid))
    }

    return (
        <div className='status-message'>
            {min} | {max} | 
            <span>
                Obecnie masz {amount} {prularizeForm(amount)} produktu
            </span>
            <button onClick={handleIncrement} disabled={isBlocked}>+</button>
            <button onClick={handleDecrement} disabled={isBlocked}>-</button>
        </div>
    )
}

export default Status
