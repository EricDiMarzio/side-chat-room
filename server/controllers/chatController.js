import { Chat } from "../models/model.js";
import { wss } from "../server.js";
const chatController = {}

chatController.getChat = async (req, res, next) => {
    try {
        res.locals.chat = await Chat.find({})
        return next();
    } catch (err) {
        return next({
            log: `Error occurred in userController.getChat. ERROR: ${err}`,
            message: {
                err: "An error getting the chat",
            },
            status: 500,
        })
    }
}

chatController.addNewPost = async (req, res, next) => {
    try {
        const body = req.body;
        res.locals.newMessage = body;
        //  const { name, email, age } = req.body;
        const newPost = new Chat(body);
        const savedUser = await newPost.save();
        return next();

    } catch (err) {
        return next({
            log: `Error occurred in userController.addNewPost. ERROR: ${err}`,
            message: {
                err: "An error occurred adding a message to the database",
            },
            status: 500,
        })
    }
}

chatController.updateClients = (req, res, next) => {
    try {
        console.log('Update Client...');
        console.log(res.locals.newMessage);
        wss.clients.forEach(client => {
            if (client.readyState === 1) { // 1 means WebSocket.OPEN
                // TODO - Move to Router?  Would need to import wss
                client.send(JSON.stringify(res.locals.newMessage));
            }
        });
        return next();
    } catch (err) {
        return next({
            log: `Error occurred in chatController.updateClients. ERROR: ${err}`,
            message: {
                err: "An error occurred while broadcasting to clients",
            },
            status: 500,
        });
    }
};

export default chatController;