import Sequelize, { Model } from 'sequelize';

export default class Agendas extends Model {
    static init(sequelize) {
        super.init({
            descricao: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            date: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
        }, {
            sequelize,
        })

        return this;
    }


    static associate(models) { }
}