import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const openConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // sets the name of the DB that our collections are in
            dbName: 'database-54'
        });
        console.log('connected to MongoDB database');
    } catch (err) {
        console.error('Error connecting to MongoDB ', err);
        throw err;
    }
}
// Destructuring -- otherwise we would need 'new mongoose.Schema...' below
const { Schema } = mongoose;

// Schemas
const chatSchema = new Schema({
    user: String,
    message: String,
    timestamp: Date,
})

// Models
// References existing collection or creates one if 'chat' isn't found
const Chat = mongoose.models.chat || mongoose.model('chat', chatSchema)

export {
    Chat,
    openConnection,
}
