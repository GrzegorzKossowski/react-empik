import React from 'react'
//redux
import { useDispatch, useSelector } from "react-redux";
import { incrementAmount, decrementAmount } from '../../redux/cart/cart-actions'

import './status.css'

const prularizeForm = (amount) => {
    return amount > 4 ? "sztuk" : amount > 1 ? "sztuki" : "sztukę"
}

const Status = (props) => {

    const { amount, pid, min, max, isBlocked = false } = props
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(incrementAmount(pid))
    }

    const handleDecrement = () => {
        dispatch(decrementAmount(pid))
    }

    return (
        <div className='status-message'>
            <button onClick={handleIncrement} disabled={isBlocked}>+</button>
            <button onClick={handleDecrement} disabled={isBlocked}>-</button>
            <span>
                Obecnie masz {amount} {prularizeForm(amount)} produktu
            </span>
        </div>
    )
}

export default Status
