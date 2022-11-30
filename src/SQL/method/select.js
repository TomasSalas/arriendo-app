import { pool } from '../../db.js'


export default async (params) => {
  const { table } = params
  const [queryselect] = await pool.query(`SELECT * FROM ${table}`)
  
  return queryselect
} 