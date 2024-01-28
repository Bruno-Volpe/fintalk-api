import express from 'express'
import dotenv from 'dotenv'
//import './database'
import cors from 'cors'

dotenv.config()

const whiteList = [
    'http://localhost:3000'
]

const corsOptions = {
    origin: function(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void){
        if (origin && whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS!'))
        }
    }
}

class App{
    app: express.Application;

    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    routes(){
    }
}

export default new App().app