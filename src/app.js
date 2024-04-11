import express from 'express';
import dotenv from 'dotenv';
import './database';
import cors from 'cors';

import loginRouter from './routes/login';
import customersRouter from './routes/customers';
import agendaRouter from './routes/agenda';
//import profileRouter from './routes/profiles';

import loginRequired from './middlewares/loginRequired';

dotenv.config();

// const whiteList = [
//     'http://localhost:3000',
//     'https://ligeirinho.netlify.app',
// ];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (origin && whiteList.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS!'));
//         }
//     }
// };

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    }
};

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/login', loginRouter)
        this.app.use('/customers', loginRequired, customersRouter)
        this.app.use('/agenda', loginRequired, agendaRouter)
        // this.app.use('/profiles', loginRequired, profileRouter)
    }
}

module.exports = new App().app;
