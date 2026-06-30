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
const editBook = async (req, res) => {
  try {
    const bookId = req.params.id
    const body = req.body

    const updatedBook = await Book.findOneAndUpdate({ _id: bookId, userId: req.userLogged.id },
      { ...body },
      { new: true, projection: { userId: 0 } }
    )

    //check if the book was found and updated
    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found or unauthorized for editing' })
    }


    res.status(200).json({ success: true, message: 'Book updated successfully', data: updatedBook })
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Error editing book', error: error.message })
  }
}

//get all books for a specific user
const getAllBooks = async (req, res) => {
  try {
    const userLogged = req.userLogged
    const books = await Book.find({ userId: userLogged.id }, { userId: 0 })
    res.status(200).json({ success: true, message: 'Books fetched successfully', data: books })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books', error: error.message })
  }
}

//get a single book by its id
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id
    const userLogged = req.userLogged
    const book = await Book.findOne({ _id: bookId, userId: userLogged.id }, { userId: 0 })

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found or unauthorized' })
    }

    res.status(200).json({ success: true, message: 'Book fetched successfully', data: book })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching book', error: error.message })
  }
}

//delete a book by its id
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id
    const userLogged = req.userLogged
    const deletedBook = await Book.findOneAndDelete({ _id: bookId, userId: userLogged.id })

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found or unauthorized for deletion' })
    }

    const bookData = deletedBook.toObject()
    delete bookData.userId

    res.status(200).json({ success: true, message: 'Book deleted successfully', data: bookData })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting book', error: error.message })
  }
}

export { createBook, editBook, getAllBooks, getBookById, deleteBook }