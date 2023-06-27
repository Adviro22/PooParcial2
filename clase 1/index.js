import express from "express";
const app = express(); //crea el servidor
const port = 3000;

//Para que soporte el formato json
app.use(express.json())

let users = [
  { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' },
  { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' },
  { id: 3, name: 'Usuario 3', email: 'usuario3@example.com' }
];

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users); // Envia el arreglo de usuarios como respuesta
});

// Ruta para obtener un usuario específico por ID
app.get('/users/:id', (req, res) => {
  console.log(req.params)
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user); // Envia el usuario encontrado como respuesta
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

//Inicia el servidor
app.listen(port, () =>{
    console.log(`servidor iniciado en el purto ${port}`)
})