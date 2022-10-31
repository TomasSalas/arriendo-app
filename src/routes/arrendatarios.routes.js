import { Router } from 'express'
import controllerArrendatarios from '../controllers/arrendatarios.controllers.js'
const router = Router()

router.get('/arrendatarios' , controllerArrendatarios.getArrendatarios)

router.post('/arrendatarios' ,controllerArrendatarios.postArrendatarios)

router.put('/arrendatarios' , (req, res) => {
  res.send('Actualizar Arrendatarios')
})

router.delete('/arrendatarios' , (req, res) => {
  res.send('Eliminar Arrendatarios')
})

export default router