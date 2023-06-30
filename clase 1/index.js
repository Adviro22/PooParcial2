//const express = require('express');
import express from "express";
const app = express(); // crea el servidor
const port = 3000;
// middlewares. son funciones que ejecutan codigo predefinido
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// Arreglo de usuarios en memoria (simulación de base de datos)
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
app.get('/users/:id/', (req, res) => {
  console.log(req.params)
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.json(user); // Envia el usuario encontrado como respuesta
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});
// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = req.body; // Se asume que se envía un objeto JSON en la solicitud

  // Asigna un ID único al nuevo usuario
  const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  newUser.id = newUserId;

  users.push(newUser); // Agrega el nuevo usuario al arreglo

  res.status(201).json(newUser); // Envia el nuevo usuario creado como respuesta
});

// Ruta para actualizar un usuario existente
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body; // Se asume que se envía un objeto JSON en la solicitud
  console.log(req.body)
  // Busca el usuario a actualizar en el arreglo
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser }; // Actualiza los datos del usuario

    res.json(users[userIndex]); // Envia el usuario actualizado como respuesta
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para eliminar un usuario existente
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(req)
  // Filtra el arreglo para obtener todos los usuarios excepto el que se eliminará
  // Filtra el arreglo para obtener todos los usuarios excepto el que se eliminará
  users = users.filter(user => user.id !== userId);

  res.sendStatus(204); // Envía una respuesta exitosa sin contenido
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});