import dbClient from "./database.ts"

interface UserSchema {
  _id: { $oid: string }
  email: string
  password: string
  locations: { location: string, description: string }[] | null
}

export default () => {
  return dbClient().collection<UserSchema>("users")
}