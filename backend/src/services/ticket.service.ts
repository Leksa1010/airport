import {AppDataSource} from "../db";
import {Ticket} from "../entities/Ticket";
import {IsNull} from "typeorm";
import {isNull} from "node:util";

const repo = AppDataSource.getRepository(Ticket)

export class TicketService {
    static async getAllTickets() {
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            },
            relations: {
                airline: true
            }
        })

        data.forEach(e => delete e.deletedAt)
        return data
    }

    static async createTicket(ticket: Ticket) {
        ticket.userId = 1
        ticket.deletedAt = null
        ticket.createdAt = new Date()

        const data = await repo.save(ticket)
        delete data.deletedAt
        return data
    }

    static async deleteTicket(id: number) {
        const data = await repo.findOne({
            where: {
                ticketId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error("Karta nije pronađena")

        data.deletedAt = new Date()
        await repo.save(data)
    }
}