import moongose from 'mongoose';

export const connectDB = async () => {
    try{
        await moongose.connect('mongodb://localhost/Dimex_users');
        console.log('DB is connected');
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
    }
};