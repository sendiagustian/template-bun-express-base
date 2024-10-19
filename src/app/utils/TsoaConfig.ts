import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const apiVersion = process.env.API_VERSION || "v1";
const host = process.env.BASE_URL + ":" + process.env.PORT || "http://127.0.0.1:8080";

const tsoaConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    controllerPathGlobs: ["src/routes/**/*.ts"],
    routes: {
        routesDir: "docs",
        specVersion: 3
    },
    spec: {
        outputDirectory: "docs",
        specVersion: 3,
        securityDefinitions: {
            "X-API-TOKEN": {
                type: "apiKey",
                name: "X-API-TOKEN",
                in: "header"
            }
        },
        spec: {
            openapi: "3.0.0",
            info: {
                title: "User Management API",
                version: apiVersion,
                contact: {
                    name: "PT. Protonema",
                    email: "info@protonema.co.id"
                },
                license: {
                    name: "MIT",
                    url: "https://opensource.org/licenses/MIT"
                }
            },
            servers: [
                {
                    url: host,
                    description: "Server environment"
                }
            ]
        }
    }
};

fs.writeFileSync("tsoa.json", JSON.stringify(tsoaConfig, null, 2));

// console.log('tsoa.json telah diupdate dengan nilai dari .env');
