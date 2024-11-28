import { books } from "../database/_db.js";

const typeDefs = `#graphql
type Book {
    title: String
    author: String
}

type Query {
    books: [Book]
}
`

const resolvers = {
    Query: {
        books: () => books,
    },
};

export { typeDefs, resolvers }