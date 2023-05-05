const express = require('express')
const router = express.Router()

const Book = require('./../models/Book.model')


// index page
router.get("/", (req, res, next) => {
  res.render("index")
})


// books list
router.get("/libros/listado", (req, res, next) => {

  Book
    .find()
    .select({ title: 1 })         // Solo obtenemos el titulo e ID de la BBDD
    .sort({ title: 1 })           // Ordenamos por título ASC
    .then(books => res.render('books/list-page', { books }))
    .catch(err => console.log(err))
})


// book details
router.get('/libros/detalles/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/details-page', book))
    .catch(err => console.log(err))
})


// new book form (render)
router.get("/libros/crear", (req, res, next) => {
  res.render("books/create-page")
})


// new book form (handler)
router.post("/libros/crear", (req, res, next) => {

  const { title, description, author, rating } = req.body     // los formularios POST llegan a req.body

  Book
    .create({ title, description, author, rating })
    .then(newBook => res.redirect(`/libros/detalles/${newBook._id}`))
    .catch(err => console.log(err))
})


// edit book form (render)
router.get("/libros/editar/:book_id", (req, res, next) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render("books/edit-page", book))
    .catch(err => console.log(err))
})


// edit book form (handler)
router.post("/libros/editar/:book_id", (req, res, next) => {

  const { title, description, author, rating } = req.body
  const { book_id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

  Book
    .findByIdAndUpdate(book_id, { title, description, author, rating })
    .then(() => res.redirect(`/libros/detalles/${book_id}`))
    .catch(err => console.log(err))
})


// delete book (de tipo POST!!!!)
router.post('/libros/eliminar/:book_id', (req, res, next) => {

  const { book_id } = req.params

  Book
    .findByIdAndDelete(book_id)
    .then(() => res.redirect(`/libros/listado`))
    .catch(err => console.log(err))
})


module.exports = router