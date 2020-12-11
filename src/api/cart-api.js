import HttpService from '../services/httpService'
import ENDPOINTS from '../config/endpoints.js'

export const fetchCartProducts = () => {
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