import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts"

const app = new Application()
app
    .static("/", "../client/")
    .get("/hello", (c) => {
        return "Hello World!"
    })
    .start({ port: 8080 })
