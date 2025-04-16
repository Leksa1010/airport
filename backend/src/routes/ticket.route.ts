import { Router } from "express";
import { TicketService } from "../services/ticket.service";

export const TicketRouter = Router();

TicketRouter.get('/', async (req: any, res) => {
    try {
        const tickets = await TicketService.getAllTickets(req.user);
        res.json(tickets);
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

TicketRouter.post('/', async (req: any, res) => {
    try {
        const newTicket = await TicketService.createTicket(req.user, req.body);
        res.json(newTicket);
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

TicketRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        await TicketService.deleteTicket(id);
        res.status(204).send();
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});
