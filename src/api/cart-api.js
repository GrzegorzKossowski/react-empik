import HttpService from '../services/httpService'
import ENDPOINTS from '../config/endpoints.js'

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