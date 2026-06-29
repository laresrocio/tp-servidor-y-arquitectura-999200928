import { Book } from "../models/bookModel.js";

//create a new book
const createBook = async (req, res) => {
  try {
    //validate the user logged in the request object
    const userLogged = req.userLogged

    const body = req.body

    const newBook = await Book.create({
      title: body.title,
      author: body.author,
      genre: body.genre,
      status: body.status,
      userId: userLogged.id
    })

    newBook.save()

    const bookData = newBook.toObject()
    delete bookData.userId

    res.status(201).json({ success: true, message: 'Book added successfully', data: bookData })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding book', error: error.message })
  }
}











//edit a book by its id

//get all books for a specific user

//get a single book by its id

//delete a book by its id

export { createBook }