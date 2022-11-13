import express from 'express'
import RoutersArriendo from './routes/arriendos.routes.js'
import RoutersArrendatarios from './routes/arrendatarios.routes.js'

const app = express()

app.use(express.json())
app.use(RoutersArriendo)
app.use(RoutersArrendatarios)

export default app 