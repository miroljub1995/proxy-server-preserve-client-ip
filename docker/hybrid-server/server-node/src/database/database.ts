import mongoose from "mongoose";

const dbURI = process.env['DB_URI'] || "mongodb://localhost:27017"

const db = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(con => con.useDb('blog'))

export default async function dbClient() {
  return await db
}
