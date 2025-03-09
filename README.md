# transactions-app

This app shows the user a list of their transactions inside a table. It connects to a node.js backend to fetch the data. The node.js backend is a simple express server that uses the supabase database.

## Getting Started

### Prerequisites

- Node.js
- Supabase account

### Setup

1. Clone the repository
2. Install dependencies
   1. Install Node.js
   2. Install Bun [Docs](https://bun.sh/docs/installation), this will be used as our package manager
3. Create a Supabase account
4. Create a new Supabase project
5. Create a new Supabase database
6. Create a new table in the Supabase database using the SQL Editor

```sql
CREATE transaction_type as enum ('credit', 'debit');

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  amount FLOAT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  type transaction_type NOT NULL
);
```

7. Create a .env file in the api folder and add the following variables
   - DATABASE_URL
   - DATABASE_API_KEY
8. From the project overview, in supabase dashboard

   - Copy the Project URL adn paste it in the .env file against the DATABASE_URL variable
   - Copy the API Key and paste it in the .env file against the DATABASE_API_KEY variable

9. `cd` into the api folder and run `bun install` to install the dependencies
10. Run `npm run start` to start the server, confirm that the server is running by visiting http://localhost:3000/api

Congratulations! You have successfully set up the backend for the transactions app.

## Running the App

1. `cd` into the ui folder and run `bun install` to install the dependencies
2. `npm run dev` to start the app in development mode
3. Visit http://localhost:5173 to view the app
