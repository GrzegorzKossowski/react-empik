import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { updateProductAmount, setTotalSumCalculating } from '../../redux/cart/cart-actions'
import { useDebounce } from '../../utils/useDebounce'
import { checkAmount } from '../../api/cart-api'
import { DEBOUNCE_DELAY } from "../../config/config"

/**
 * Presents the word 'amount' in the correct grammatical form
 * 
 * @param {number} amount number of selected elements
 */
const prularizeForm = (amount) => {
    return amount > 4 ? "sztuk" : amount > 1 ? "sztuki" : "sztukę"
}

/**
 * Displays amount of selected products. Allows user to add or remove product's
 * amount from cart. Debounces button events to prevent flooding the server
 * 
 * @param {object} props properties
 */
const Status = (props) => {

    const { pid, min, max, isBlocked = false } = props
    const [productAmount, setProductAmount] = useState(min)
    const dispatch = useDispatch()
    const debouncedAmount = useDebounce(productAmount, DEBOUNCE_DELAY)


    useEffect(() => {
        dispatch(setTotalSumCalculating())
        // if (debouncedAmount) {
            checkAmount({
                "pid": pid,
                "quantity": debouncedAmount
            })
                .then((resolve, reject) => {
                    const { data } = resolve
                    if (data.success === true) {
                        dispatch(updateProductAmount(pid, productAmount))
                        setProductAmount(productAmount)
                    }
                    if (data.isError === true) {
                        dispatch(updateProductAmount(pid, min))
                        setProductAmount(min)
                    }

                })
                .catch(error => {
                    dispatch(updateProductAmount(pid, min))
                    setProductAmount(min)
                })
        // }
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
        <div className='d-flex align-items-center'>
            <button className='btn btn-dark btn-sm' onClick={handleIncrement} disabled={isBlocked}><i className="fas fa-plus"></i></button>
            <button className='btn btn-danger btn-sm' onClick={handleDecrement} disabled={isBlocked}><i className="fas fa-minus"></i></button>
            <div>
                Obecnie masz <span style={{ fontWeight: 'bold' }}>{productAmount}</span> {prularizeForm(productAmount)} produktu
            </div>
        </div >
    )
}

export default Status
