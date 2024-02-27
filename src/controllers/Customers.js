import { storeObject, showObject, removeObject, updateObject } from '../utils/crud'
import errorM from '../utils/errorM'

import Customers from '../models/Customers'
import { Model } from 'sequelize'

const store = (req, res) => {
    storeObject(req, res, Customers)
}

const show = (req, res) => {
    showObject(req, res, Customers)
}

const remove = (req, res) => {
    removeObject(req, res, Customers)
}

const update = (req, res) => {
    updateObject(req, res, Customers)
}

export {
    store,
    show,
    remove,
    update
}