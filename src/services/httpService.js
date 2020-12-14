import axios from 'axios'
import config from '../config/config'

/**
 * Service providing connection do server
 */
class HttpService {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    /**
     * Combines host domain with endpoint
     * @param {string} endpoint rest endpoint to server
     */
    _getUrl = (endpoint) => {
        return this._getHost() + endpoint
    }

    /**
     * Gets host domain from config
     */
    _getHost = () => {
        const HOST = config.HOST
        if (!HOST) {
            throw new Error("Host not find")
        }
        return HOST;
    }

    /**
     * Resolves custom headers combineing them with default class headers
     * @param {object} customHeaders JSON object - custom headers
     */
    _resolveHeaders = (customHeaders = {}) => {
        return { ...this.headers, ...customHeaders }
    }
    
    /**
     * GET method for get requests
     * @param {object} options JSON object
     */
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

    /**
     * POST method for post requests
     * @param {object} options JSON object
     */
    post = options => {
        axios({
            headers: this._resolveHeaders(options.headers),
            data: options.payload ? options.payload : {},
            method: 'post',
            url: this._getUrl(options.endpoint)
            // url: `http://localhost:3030/api/product/check`
        })
            .then(response => {
                options.onSuccess(response);
            })
            .catch(error => {
                options.onError(error.response)
            })


    }

}

export default HttpService;