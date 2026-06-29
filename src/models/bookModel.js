import { Schema, model } from "mongoose";

//schema for a digital base library book
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      default: "Unknown Author"
    },
    genre: {
      type: String,
      default: "Unknown Genre"
    },
    status: {
      type: String,
      enum: ["read", "reading", "to read"],
      default: "to read"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { versionKey: false, timestamps: true }
)

const Book = model("Book", bookSchema);

export { Book }