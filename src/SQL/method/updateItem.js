import { pool } from '../../db.js'


export default async (params) => {
  const { table , set , condicion } = params
  const [updateItem] = await pool.query(`UPDATE ${table} set ${set} WHERE ${condicion}`)
  
  return updateItem
} 