import { storeObject } from '../utils/crud'
import errorM from '../utils/errorM'

import Customers from '../models/Customers'

const store = (req, res) => {
    storeObject(req, res, Customers)
}

export {
    store,
}