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
                options.onSuccess(response);
            })
            .catch(error => {
                options.onError(error)
            })
    }

    post = options => {
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload ? options.payload : {},
            method: 'post',
            url: this._getUrl(options.endpoint)
            // url: `http://localhost:3030/api/product/check`
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    options.onSuccess(response);
                } else {
                    throw new Error('No data', response);
                }
            })
            .catch(error => {
                options.onError(error.response)
            })


    }

}

export default HttpService;