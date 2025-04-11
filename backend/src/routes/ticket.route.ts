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

TicketRoute.post("/", async (req, res) => {
    try {
        res.json(await TicketService.createTicket(req.body))
    } catch(e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})

TicketRoute.delete("/:id", async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        res.json(await TicketService.deleteTicket(id))
        res.status(204).send()
    } catch(e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})