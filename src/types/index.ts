import config from "./config";

export const options: config.MongoOptions = {
	useUnifiedTopology: true,
	ignoreUndefined: true,
};

export const Root: config.API = {
	statusCode: 200,
	availableAPIs: [`/search/:location`, `/search/:location/:name`, `/search/:location/:name/:type`],
};

export enum Environments {
	dev_environment = "string",
	prod_environment = "prod",
}

export enum Collections {
	BILLING_USER_COLLECTION,
	BILLING_WORKSPACE_COLLECTION,
	COURSES_COLLECTION,
	INVOICE_COLLECTION,
	ORDER_COLLECTION,
	PARTNER_COLLECTION,
	REVIEW_COLLECTION,
	SPACE_COLLECTION,
	USERS_COLLECTION,
	WORKSPACE_COLLECTION,
}