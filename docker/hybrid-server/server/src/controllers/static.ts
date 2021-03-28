import type { Application } from "abc/mod.ts";
import { fallbackToIndexHTML } from "../middlewares.ts";

export default function addStatic(app: Application) {
  app
    .use(fallbackToIndexHTML)
    .static("/", "../client/")
}