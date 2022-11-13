import { pool } from '../db.js'
import uniqid from 'uniqid'


const getArrendatarios  = async (req , res ) => {
  const [ resultArrendatarios ] = await pool.query('SELECT * FROM ARRENDATARIO')
  res.json(resultArrendatarios)
}

const postArrendatarios = async (req , res ) => {
  const id = uniqid().toUpperCase()
  const { nombre, apellidos , correo , telefono } = req.body
  const [ resultArrendatarios ] = await pool.query(
    'INSERT INTO ARRENDATARIO (ID_ARRENDATARIO, NOMBRE , APELLIDOS , CORREO , TELEFONO ) VALUES (?, ?, ? ,?, ?)' , 
    [id ,nombre , apellidos , correo , telefono]
  )

  if(resultArrendatarios.affectedRows < 0)
  res.send(resultArrendatarios)
}

const deleteArrendatarios = async (req , res ) => {
  let errors = {}
  const [queryIDarrendatario] = await pool.query('SELECT * FROM ARRENDATARIO WHERE ID_ARRENDATARIO = ?' , [req.params.ID_ARRENDATARIO])
  if(queryIDarrendatario.length == 0){
    errors = {
      code: 'INVALID ID_ARRENDATARIO',
      message: 'Invalid or missing ID_ARRENDATARIO'
    }
  }

  const [ resultDeletedArriendos ] = await pool.query('DELETE FROM ARRIENDO WHERE ID_ARRENDATARIO = ?' , [req.params.ID_ARRENDATARIO])
  if (resultDeletedArriendos.affectedRows = 0) {
    errors = {
      code: 'ERROR_DELETED_ARRIENDOS',
      message: 'error removing leases'
    }
  }

  const [resultDeleted] = await pool.query('DELETE FROM ARRENDATARIO WHERE ID_ARRENDATARIO = ?' , [req.params.ID_ARRENDATARIO])
  if (resultDeleted.affectedRows = 0) {
    errors = {
      code: 'ERROR_DELETED_ARRENDATARIO',
      message: 'error removing tenant'
    }
  }

  errors = {
    code: null,
    message: 'Deleted successfully'
  }

  res.send(errors)
}

export default { getArrendatarios , postArrendatarios , deleteArrendatarios } 