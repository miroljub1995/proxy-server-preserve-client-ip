import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const dbURI = Deno.env.get('DB_URL') || "mongodb://localhost:27017"

export default function dbClient() {
  const client = new MongoClient()
  client.connectWithUri(dbURI)
  return client.database("location_saver")
}
