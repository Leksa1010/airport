import {Router} from "express";
import {TicketService} from "../services/ticket.service";

export const TicketRoute = Router()

TicketRoute.get("/", async (req, res) => {
    try{
        res.json(await TicketService.getAllTickets())
    } catch(e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date() //Date.now()
        })
    }
})