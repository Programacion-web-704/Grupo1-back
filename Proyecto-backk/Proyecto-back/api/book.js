router.get('/MostrarLibros', async (req, res) => {
    try {
      // Obtener todos los libros desde la base de datos
      const librosList = await db.libros.findAll();
      res.status(200).json(librosList);
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  
  router.post('/book', async (req, res) => {
    try {
      const { isbn_libro, 
        titulo,
        fecha_publicacion, 
        genero,
        idioma, 
        paginas, 
        stock,
        autor, 
        estado, 
        editorial} = req.body;
  
      console.log(req.body)
  
      const nuevoLibro = await db.libros.create({
        isbn_libro, 
        titulo,
        fecha_publicacion, 
        genero,
        idioma, 
        paginas, 
        stock,
        autor, 
        estado, 
        editorial,
        reserva: 'NoReservado',


      });
  res.status(200).json({ success: true, message: 'Libro Guardado', data: nuevoLibro });
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
    }
  });
  
  
  module.exports = router;