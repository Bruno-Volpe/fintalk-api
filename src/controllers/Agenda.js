import { storeObject, showObject, removeObject, updateObject } from '../utils/crud';

export const store = async (req, res) => {
    storeObject(req, res, 'Agenda');
}

export const show = async (req, res) => {
    showObject(req, res, 'Agenda');
}

export const remove = async (req, res) => {
    removeObject(req, res, 'Agenda');
}


