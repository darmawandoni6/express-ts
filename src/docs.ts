import fs from "fs";
import path from "path";

import { authDocs } from "./docs/auth-docs";

// Load package.json
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

export const docsSwagger = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: packageJson.version, // Inject version dynamically
    description: "Dokumentasi API dengan Swagger & TypeScript",
  },
  paths: {
    ...authDocs.paths,
  },
  components: {
    ...authDocs.components,
  },
};
