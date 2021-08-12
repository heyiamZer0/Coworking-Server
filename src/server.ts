import express, { Application, Request, Response, NextFunction } from "express";

import routes from "./routes";

export default function createServer() {
	const app: Application = express();
	app.use(routes);
	return app;
}
