import {AppDataSource} from "../db";
import {Ticket} from "../entities/Ticket";
import {IsNull} from "typeorm";

const repo = AppDataSource.getRepository(Ticket)

export class TicketService {
    static async getAllTickets() {
        return repo.find({
            where: {
                deletedAt: IsNull()
            },
            relations: {
                airline: true
            }
        })
    }
}