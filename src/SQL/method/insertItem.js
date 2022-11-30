import { pool } from '../../db.js'


export default async (params) => {
  const { table , id , nombre , apellidos , rut , correo , telefono , estado } = params
  const [queryinsert] = await pool.query(
    `INSERT INTO ${table} (ID_ARRENDATARIO, NOMBRE , APELLIDOS , RUT, CORREO , TELEFONO , ESTADO) VALUES (?, ?, ? ,?, ? ,? ,?)`, 
    [id, nombre, apellidos, rut, correo, telefono, estado]
  )
  
  return queryinsert
} 