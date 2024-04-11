import { storeObject, showObject, removeObject } from '../utils/crud';
import Agendas from '../models/Agendas';
import errorM from '../utils/errorM';

export const store = async (req, res) => {
    storeObject(req, res, Agendas);
}

export const show = async (req, res) => {
    try {
        const agendas = await Agendas.findAll();
        res.status(200).json(agendas);
    } catch (e) {
        res.status(404).json(errorM("Erro ao buscar agendas"));
    }
}

export const getByDate = async (req, res) => {
    try {
        const { date } = req.body;
        const agendas = await Agendas.findAll({ where: { date } });
        res.status(200).json(agendas);
    } catch (e) {
        res.status(404).json(errorM("Erro ao buscar agendas"));
    }
}

export const remove = async (req, res) => {
    removeObject(req, res, Agendas);
}
