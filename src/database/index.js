import Sequileze from 'sequelize'
import databaseConfig from '../config/database'

import Users from '../models/Users'
import Customers from '../models/Customers'

const models = [Users, Customers]

const connection = new Sequileze(databaseConfig)

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

export default connection;