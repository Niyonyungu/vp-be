import express from "express";
import contact from "../controllers/contactController.js";

const contactRoutes = express.Router();

contactRoutes.post("/", contact.sendMessage)
contactRoutes.get("/", contact.getMessages)
contactRoutes.get("/:id", contact.getMessage)
contactRoutes.delete("/:id", contact.deleteMessage)
contactRoutes.put("/:id", contact.updateMessageStatus)


export default contactRoutes;

