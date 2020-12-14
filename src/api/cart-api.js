import HttpService from '../services/httpService'
import ENDPOINTS from '../config/endpoints.js'

/**
 * Gets all products from server.
 * @param
 */
export const fetchProducts = () => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.get({
            headers: {},
            endpoint: `${ENDPOINTS.CART}`,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        })
    })
}

/**
 * Checks if products amount selected by user is valid.
 * @param {json} data JSON object containing pid and quantity
 */
export const checkAmount = (data) => {
    return new Promise((resolve, reject) => {
        const httpClient = new HttpService();
        httpClient.post({
            headers: {},
            endpoint: `${ENDPOINTS.CHECK}`,
            payload: data,
            onSuccess: data => resolve(data),
            onError: error => reject(error)
        })
    })
}