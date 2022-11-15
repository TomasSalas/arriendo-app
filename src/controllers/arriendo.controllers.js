import { pool } from '../db.js'
import uniqid from 'uniqid'

const getArriendos  = async (req , res ) => {
  let errors = {}
  const [ resultArrendatarios ] = 
  await pool.query("SELECT A.ID_ARRIENDO , A.FECHA , A.HORA , A.CANCHA , CONCAT(AR.NOMBRE , ' ' , AR.APELLIDOS) AS NOMBRE , AR.TELEFONO FROM Canchas.ARRIENDO A JOIN Canchas.ARRENDATARIO AR ON A.ID_ARRENDATARIO = AR.ID_ARRENDATARIO ")

  console.log(resultArrendatarios)
  if(resultArrendatarios.length > 0) {
    errors = {
      code: null,
      data: resultArrendatarios
    }
  }else{
    errors = {
      code: 'ERROR_QUERY_RENT',
      message: 'ERROR IN QUERY OR QUERY EMPTY'
    }
  }


  res.send(errors)
}

const insertArriendos = async (req , res ) => {
  let errors = {}
  const ID_ARRIENDO = uniqid().toUpperCase()
  const { FECHA, HORA , CANCHA , ID_ARRENDATARIO } = req.body
  
  const [queryIDarrendatario] = await pool.query('SELECT * FROM ARRENDATARIO WHERE ID_ARRENDATARIO = ?' , ID_ARRENDATARIO )
  if(queryIDarrendatario.length > 0) {
    const [ insertArriendos ] = await pool.query('INSERT INTO ARRIENDO (ID_ARRIENDO, FECHA , HORA , CANCHA , ID_ARRENDATARIO ) VALUES (?, ?, ? ,?, ?)' , [ID_ARRIENDO ,FECHA , HORA , CANCHA , ID_ARRENDATARIO])
  
    if(insertArriendos.affectedRows = 0) {
      errors = {
        code: 'INVALID INSERT ',
        message: 'Invalid or missing data for insert'
      }
    }
    errors = {
      code: null,
      message: 'Insert successfully'
    }
  }else{
    errors = {
      code: 'INVALID ID_ARRENDATARIO',
      message: 'Invalid or missing ID_ARRENDATARIO'
    }
  }

  res.send(errors)
}

export default { getArriendos , insertArriendos } 