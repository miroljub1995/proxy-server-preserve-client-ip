import mongoose from "mongoose";

const dbURI = process.env['DB_URI'] || "mongodb://localhost:27017"

export default async function dbClient() {
  const con = await mongoose.createConnection(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  return con.useDb('blog')
}
