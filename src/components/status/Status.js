import React, { useEffect, useState } from 'react'
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateProductAmount, incrementAmount } from '../../redux/cart/cart-actions'
import { useDebounce } from '../../utils/useDebounce'
import { checkAmount } from '../../api/cart-api'
import { DEBOUNCE_DELAY } from "../../config/config"

import './status.css'

const prularizeForm = (amount) => {
    return amount > 4 ? "sztuk" : amount > 1 ? "sztuki" : "sztukę"
}

const Status = (props) => {

    const { pid, min, max, isBlocked = false } = props
    const [productAmount, setProductAmount] = useState(min)
    const dispatch = useDispatch()
    const debouncedAmount = useDebounce(productAmount, DEBOUNCE_DELAY)


    useEffect(() => {
        // effect
        console.log("product change", pid.slice(0, 8));
        dispatch(updateProductAmount(pid, productAmount))
        if (debouncedAmount !== min) {

            checkAmount({
                "pid": pid,
                "quantity": debouncedAmount
            })
                .then((resolve, reject) => {
                    const { data } = resolve
                    console.log("then", data);
                })
                .catch(error => {
                    const { data } = error
                    console.log("error", data);
                })
        }
        return () => {
            // cleanup
        }
    }, [debouncedAmount, dispatch])

    const handleIncrement = () => {
        if (productAmount < max) {
            setProductAmount(prevProductAmount => prevProductAmount + 1)
        }
    }

    const handleDecrement = () => {
        if (productAmount > min) {
            setProductAmount(prevProductAmount => prevProductAmount - 1)
        }
    }


    return (
        <div className='status-message'>
            <span>
                Obecnie masz <span style={{fontWeight: 'bold'}}>{productAmount}</span> {prularizeForm(productAmount)} produktu
            </span>
            <button className='btn btn-primary' onClick={handleIncrement} disabled={isBlocked}><i className="fas fa-plus"></i></button>
            <button className='btn btn-danger' onClick={handleDecrement} disabled={isBlocked}><i className="fas fa-minus"></i></button>
        </div >
    )
}

export default Status
