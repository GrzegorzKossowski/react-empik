import axios from 'axios'
import config from '../config/config'

class HttpService {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    _getUrl = (endpoint) => {
        return this._getHost() + endpoint
    }

    _getHost = () => {
        const HOST = config.HOST
        if (!HOST) {
            throw new Error("Host not find")
        }
        console.log('HOST: ', HOST);
        return HOST;
    }

    _resolveHeaders = (customHeaders = {}) => {
        return { ...this.headers, ...customHeaders }
    }

    get = options => {
        axios({
            headers: this._resolveHeaders(options.headers),
            method: 'get',
            url: this._getUrl(options.endpoint)
            // url: `http://localhost:3030/api/cart`
        })
            .then(response => {
                options.onSuccess(response)
            })
            .catch(error => {
                options.onError(error)
            })
    }

}

export default HttpService;