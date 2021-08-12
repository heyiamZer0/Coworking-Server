import express from "express";
import { establishConnection } from "./db";
import createServer from "./server";
import env from "./env";
import log from "./logger";

const startServer = async () => {
	const app = createServer();
	const HOST: string = env.getHost();
	const PORT: number = env.getPort();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.listen(PORT, () => {
		log.info(`Server is running at http://${HOST}:${PORT}`);
	});

	const dbName: string = env.getDBName();
	await establishConnection(dbName);
};

startServer();
