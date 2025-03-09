# Transactions App (FE)

This doc outlines the overview of the transactions app.

## Getting Started

To get started, you'll need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/).
To install the dependencies, you will need to install [Bun](https://bun.sh/docs/installation). Bun is a fast, modern JavaScript runtime that is designed to be simple and fast.

1. `bun install` to install the dependencies
2. `npm run dev` to start the app in development mode

## Folder Structure

This is a Client Side Rendered React app scaffolded with the [React Vite](https://vitejs.dev/guide/react) template.
The main code of teh app is located in the `src` folder.

Let's take a look at the folder structure:

```
├── src
│   ├── components # contains all the components used in the app
│   │   error-boundary.tsx # components which are shared across the app, reside in component folder's root. Like this one.
│   │   transactions # components which are specific to the transactions, reside in their specific folder
│   │   ├── pagination.tsx
│   │   ├── type.tsx
│   │   └── index.tsx
│   ├── constants # to define all sort of constants used in the app
│   ├── data # to define all sort of data fetching used in the app
│   │   transactions.ts # exports the hook to get all transactions
│   ├── hooks # to define all sort of reusebale hooks used in the app
│   │   query-params.ts # exports the hook to get query params
│   ├── index.css # defines the global variables, and initializes the tailwind css
│   ├── main.tsx # the entry point of the app
│   ├── vite-env.d.ts
│   └── App.tsx # the main component of the app, to setup routing and global state providers etc.
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
├── README.md
└── tailwind.config.js
```

## Third Party Libraries Used

1. Tanstack Query for data fetching
2. React Router for routing
3. Tailwind CSS for styling
4. Vite for building the application
