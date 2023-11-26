const express = require('express');
const db = require('../db/models/index');
const ruta = express.Router();

ruta.post('/', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar el usuario en la base de datos con carga de asociación
    const usuarioEncontrado = await db.usuarios.findOne({
      where: {
        correo: usuario,
        contrasena: contraseña,
      },
    });

    if (usuarioEncontrado) {
      // Usuario encontrado, devolver la información
      return res.status(200).json(usuarioEncontrado).end();
    } else {

      return res.status(401).end();
    }
  } catch (error) {
    console.error("Error - credenciales:", error);
    return res.status(500).json({ error: " error - servidor." }).end();
  }
});

module.exports = ruta;