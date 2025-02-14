import config from '../config'
import mongoose from 'mongoose'

// hide deprecation warning
mongoose.set("strictQuery", false);
export const MONGOBD_CONNECT = async (callback: () => void) => {
    try {
        mongoose.connect(
            config.mongo.uri as string,
            {
                autoIndex: true,
            })
        console.log(`Database connected in ${(config.app.env)?.toUpperCase()} mode 🚀`)

        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected')
        })
        callback();
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to database')
    }
}
