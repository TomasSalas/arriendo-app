import { pool } from '../db.js'
import uniqid from 'uniqid'


const getArrendatarios  = async (req , res ) => {
  const [ resultArrendatarios ] = await pool.query('SELECT * FROM ARRENDATARIO')
  res.json(resultArrendatarios)
}

const postArrendatarios = async (req , res ) => {
  const id = uniqid()
  const { nombre, apellidos , correo , telefono } = req.body
  const [ resultArrendatarios ] = await pool.query(
    'INSERT INTO ARRENDATARIO (ID_ARRENDATARIO, NOMBRE , APELLIDOS , CORREO , TELEFONO ) VALUES (?, ?, ? ,?, ?)' , 
    [id ,nombre , apellidos , correo , telefono]
  )
  res.send({ resultArrendatarios })
}


export default { getArrendatarios , postArrendatarios } 