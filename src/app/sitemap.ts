import fs from "fs";
import { MetadataRoute } from "next";
import path from "path";

const baseUrl = process.env.SITE_URL || "http:localhost:3000";
const baseDir = "src/app";
const excludeDirs = ["api", "fonts", "_components", "_styles"];

export const revalidate = 3600; // revalidate at most every hour

async function getRoutes(): Promise<MetadataRoute.Sitemap> {
  const fullPath = path.join(process.cwd(), baseDir);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  const routes: string[] = ["/"];

  entries.forEach((entry) => {
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      routes.push(`/${entry.name}`);
    }
  });

  // to create dynamic routes.
  //   async function getBlogs() {
  //     const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  //     const todos = await data.json();
  //     console.log(todos, "todos");
  //     const todoRoutes: string[] = todos.map((todo: unknown) => `/todo/${todo.id}`);
  //     routes = [...routes, ...todoRoutes];
  //   }

  //   await getBlogs();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));
}

export default function sitemap() {
  return getRoutes();
}
