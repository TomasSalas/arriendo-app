import { pool } from '../../db.js'


export default async (params) => {
  const { table , condicion } = params
  const [queryselectWhere] = await pool.query(`SELECT * FROM ${table} WHERE ${condicion}`)
  
  return queryselectWhere
} 