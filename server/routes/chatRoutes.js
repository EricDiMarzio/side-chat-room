import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();


router.get('/', chatController.getChat, (req, res) => {
    res.status(200).json(res.locals.chat)
})

router.post('/', chatController.addNewPost, chatController.updateClients, (req, res) => {
    res.status(200).json("Post successfully added")
})


export default router;