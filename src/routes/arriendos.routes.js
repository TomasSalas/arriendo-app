import { Router } from 'express'
import controllerArriendo from '../controllers/arriendo.controllers.js'

const router = Router()

router.get('/arriendos' , controllerArriendo.getArriendos)


router.post('/arriendos' , controllerArriendo.insertArriendos)

router.put('/arriendos' , (req, res) => {
  res.send('Actualizar Arriendos')
})

router.delete('/arriendos' , (req, res) => {
  res.send('Eliminar Arriendos')
})

export default router