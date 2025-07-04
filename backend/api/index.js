import app from "../express-app.js";
import serverless from "serverless-http";

export const handler = serverless(app);
