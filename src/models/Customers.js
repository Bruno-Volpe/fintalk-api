import Sequelize, { Model } from 'sequelize';

export default class Customers extends Model {
    static init(sequelize) {
        super.init({
            full_name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "The full name field cannot be empty"
                    },
                    len: {
                        args: [3, 255],
                        msg: "The full name field must be between 3 and 255 characters"
                    }
                }
            },
            birth: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        msg: "The birth field must be a valid date"
                    },
                    notEmpty: {
                        msg: "The birth field cannot be empty"
                    }
                }
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: "The CPF field cannot be empty"
                    },
                    is: {
                        args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        msg: "The CPF field must be in the format xxx.xxx.xxx-xx"
                    },
                }
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "The CEP field cannot be empty"
                    },
                    is: {
                        args: /^\d{5}-\d{3}$/,
                        msg: "The CEP field must be in the format xxxxx-xxx"
                    }
                }
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
        });

        return this
    }

    static associate(models) { }
}
