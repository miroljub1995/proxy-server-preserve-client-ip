import mongoose from "mongoose";

const dbURI = process.env['DB_URI'] || "mongodb://localhost:27017"

export const con = mongoose.createConnection(dbURI + "/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
