import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const apiVersion = process.env.API_VERSION || "v1";
const host =
    process.env.MODE == "production"
        ? process.env.BASE_URL
        : process.env.BASE_URL + ":" + process.env.PORT || "http://127.0.0.1:5050";

const tsoaConfig = {
    entryFile: "src/main.ts",
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
                title: "Docs API Tong Nyampah",
                version: apiVersion,
                contact: {
                    name: "Sendi Studio",
                    email: "sendiagustian@sendistudio.id"
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
