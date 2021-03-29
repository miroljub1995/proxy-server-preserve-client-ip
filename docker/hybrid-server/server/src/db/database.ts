import { MongoClient } from 'mongo/mod.ts'
import { Database } from 'mongo/src/database.ts'

const dbURI = Deno.env.get('DB_URI') || "mongodb://localhost:27017"

export default async function dbClient(): Promise<Database> {
  const client = new MongoClient()
  await client.connect(dbURI)
  return client.database("blog")
}
