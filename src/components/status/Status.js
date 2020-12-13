import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateProductAmount } from '../../redux/cart/cart-actions'
import { useDebounce } from '../../utils/useDebounce'
import { checkAmount } from '../../api/cart-api'
import { DEBOUNCE_DELAY } from "../../config/config"

import './status.css'

const prularizeForm = (amount) => {
    return amount > 4 ? "sztuk" : amount > 1 ? "sztuki" : "sztukę"
}

const Status = (props) => {

    const { pid, min, max, isBlocked = false } = props
    const dispatch = useDispatch()
    const [productAmount, setProductAmount] = useState(min)

    const debouncedAmount = useDebounce(productAmount, DEBOUNCE_DELAY)

    useEffect(() => {
        if (debouncedAmount !== min) {

            checkAmount({
                "pid": pid,
                "quantity": debouncedAmount
            })
                .then((resolve, reject) => {
                    const { data } = resolve
                    if (data.success) {
                        setProductAmount(debouncedAmount)
                        dispatch(updateProductAmount(pid, debouncedAmount))
                    }
                })
                .catch(error => {
                    const { data } = error
                    console.log(data);
                    setProductAmount(min)
                    dispatch(updateProductAmount(pid, min))
                })
        }
        return () => {
            // cleanup
        }
    }, [debouncedAmount, dispatch])

    const handleIncrement = () => {
        setProductAmount(prevProductAmount => prevProductAmount + 1)
    }

    const handleDecrement = () => {
        setProductAmount(prevProductAmount => prevProductAmount - 1)
    }

    return (
        <div className='status-message'>
            {min} | {max} |
            <span>
                Obecnie masz {productAmount} {prularizeForm(productAmount)} produktu
            </span>
            <button onClick={handleIncrement} disabled={isBlocked}>+</button>
            <button onClick={handleDecrement} disabled={isBlocked}>-</button>
        </div >
    )
}

export default Status
