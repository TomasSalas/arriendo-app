import { pool } from '../db.js'

const getArriendos  = async (req , res ) => {
  const [ resultArrendatarios ] = 
  await pool.query("SELECT A.ID_ARRIENDO , A.FECHA , A.HORA , A.CANCHA , CONCAT(AR.NOMBRE , ' ' , AR.APELLIDOS) AS NOMBRE , AR.TELEFONO FROM Canchas.ARRIENDO A JOIN Canchas.ARRENDATARIO AR ON A.ID_ARRENDATARIO = AR.ID_ARRENDATARIO ")
  res.json(resultArrendatarios)
}

export default { getArriendos } 