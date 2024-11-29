# GraphQL Server with Apollo Server and TypeScript

This is a simple GraphQL server built using Apollo Server and TypeScript, created for study purposes. It includes a mocked database to simulate GraphQL queries and mutations. The server is built with TypeScript and Apollo Server to manage GraphQL operations.

## Prerequisites

Make sure you have the following installed:
- Node.js (>= 20.17)
- npm

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/RenanDias12/graphQL.git
    ```
    ```
    cd graphql
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Server

There are two main commands to run the project:

### Development Mode
This will start the server with tsx, enabling hot-reloading during development.

```bash
npm run dev
```

### Production Mode
This will transpile the TypeScript code into JavaScript and run the server in a production-like environment.

```bash
npm run start
```


## GraphQL Playground
Once the server is running, you can access the GraphQL Playground at:

http://localhost:4000/

Here, you can test the GraphQL queries and mutations.

### Example Queries
Here are some example GraphQL queries you can try:

1. Get all games:
```graphql
query Games {
  games {
    id,
    title,
    platform
  }
}
```
2. Get a single game by ID:
```graphql
query Game($Id: ID!) {
  game(id: $Id) {
    id,
    title,
    platform
  }
}
```
3. Create a new game:
```graphql
mutation AddGameQuery($game: AddGameInput!) {
  addGame(game: $game) {
    id,
    title,
    platform
  }
}
```

## License
This project is licensed under the ISC License.

## Author
Renan Dias