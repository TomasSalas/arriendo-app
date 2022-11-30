import { pool } from '../db.js'
import uniqid from 'uniqid'
import SQL from '../SQL/index.js'

const getArrendatarios = async (req, res) => {
  let params = {
    table: "ARRENDATARIO"
  }
  const resultArrendatarios = await SQL.select(params)

  res.json(resultArrendatarios)
}

const postArrendatarios = async (req, res) => {
  let errors = {}
  let params = {}
  const id = uniqid().toUpperCase()
  const estado = 'ACTIVO'

  const { nombre, apellidos, rut, correo, telefono } = req.body
  params = {
    table: 'ARRENDATARIO',
    condicion: `RUT = '${rut}'`,
  }

  const resultExistsArrendatarios = await SQL.queryselectWhere(params)
  if(!resultExistsArrendatarios){
    params = {
      table: 'ARRENDATARIO',
      id,
      nombre,
      apellidos,
      rut,
      correo,
      telefono,
      estado
    }
  
    const resultArrendatarios = await SQL.insertItems(params)
  
    if (resultArrendatarios.affectedRows = 0) {
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
      code: 'USER_EXISTS',
      message: 'This user already exists'
    }
  }
  
  res.send(errors)
}

const deleteArrendatarios = async (req, res) => {
  let errors = {}
  let id = req.params.id
  let params = {}

  params = {
    table: 'ARRENDATARIO',
    condicion: `ID_ARRENDATARIO = '${id}' AND ESTADO = 'ELIMINADO'`
  }
  const resultExistsArrendatarios = await SQL.queryselectWhere(params)
  let arregloResponse = resultExistsArrendatarios.length

  if(arregloResponse === 0){
    params = {
      table: 'ARRENDATARIO',
      set: `ESTADO = 'ELIMINADO'`,
      condicion: `ID_ARRENDATARIO = '${id}'`
    }

    const updateArrendatario = await SQL.updateItem(params)

    if(updateArrendatario.affectedRows > 0){
      errors = {
        code: 'USER_DELETED',
        message: 'This user is DELETED'
      }
    }
  } else {
    errors = {
      code: 'USER_NOT_EXISTS_OR_STATUS_DELETED',
      message: 'This user not exists or status is not deleted'
    }
  }

  res.send(errors)
}

export default { getArrendatarios, postArrendatarios, deleteArrendatarios } 