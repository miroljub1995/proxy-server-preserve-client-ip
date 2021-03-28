import { MongoClient } from 'mongo/mod.ts'

const dbURI = Deno.env.get('DB_URI') || "mongodb://localhost:27017"

export default function dbClient() {
  const client = new MongoClient()
  client.connect(dbURI)
  return client.database("blog")
}
