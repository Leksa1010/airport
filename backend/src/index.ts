import {AppDataSource} from "./db"
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {AirlineRoute} from "./routes/airline.route";
import {TicketRouter} from "./routes/ticket.route";
import {FlightRoute} from "./routes/flight.route";
import {UserRoute} from "./routes/user.route";
import {UserService} from "./services/user.service";
import {configDotenv} from "dotenv";

const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())
configDotenv()

AppDataSource.initialize()
    .then(() => {
        const port = process.env.SERVER_PORT || 3000
        console.log('Connected to database')
        app.listen(port, () => console.log(`Listening on port ${port}`))
    })
    .catch(e => console.log(e))

app.use(UserService.verifyToken)
app.use('/api/user', UserRoute)
app.use('/api/airline', AirlineRoute)
app.use('/api/ticket', TicketRouter)
app.use('/api/flight', FlightRoute)