# Transactions App (BE)

This doc outlines the overview of the transactions app.

## Getting Started

To get started, you'll need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/).
To install the dependencies, you will need to install [Bun](https://bun.sh/docs/installation). Bun is a fast, modern JavaScript runtime that is designed to be simple and fast.

1. `bun install` to install the dependencies
2. `npm run dev` to start the server, confirm that the server is running by visiting http://localhost:3000/api

Congratulations!

## Folder Structure

The main code of the app is located in the `src` folder.

Let's take a look at the folder structure:

```
├── src
│   ├── entrypoint.ts
│   ├── routers # this folder contains the files in heirarchy of routers
│   │   ├── api # this folder will contain the code for handling all supported /api/* routes
│   │   |		├── transactions.ts # this file will contain the code for handling /api/transactions routes
│   ├── db
│   │   ├── index.ts # initializes the database connection
│   ├── types
│   │   ├── supabase.ts # types downloaded from the supabase database
│   └── index.ts
└── README.md
```

## Third Party Libraries Used

1. Express for handling HTTP requests
2. Supabase for database interaction
3. Cors for handling CORS requests
4. Typescript for type checking

## API Routes

```
POST /api/transactions
# accepted body
{
	"amount": number,
	"timestamp": a date time string,
	"type": string
}
# Returns 20X if successful
# Returns 400 if the body is invalid

# Response Body
{
	id: number,
	amount: number,
	timestamp: string,
	type: string
}
```

```
GET /api/transactions
# Returns 20X if successful
# Returns 500 if server fails

# Supported query params
page: number
per_page: number

# Response Body
{
	transactions: [
		{
			id: number,
			amount: number,
			timestamp: string,
			type: string
		}
	],
	total: number
}
```

```
GET /api/transactions/:id
# Returns 20X if successful
# Returns 404 if the transaction is not found
# Returns 500 if server fails

# Response Body
{
	id: number,
	amount: number,
	timestamp: string,
	type: string
}
```
