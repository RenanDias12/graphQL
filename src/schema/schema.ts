import { authors, games, reviews } from "../database/_db.js";

type QueryArgs = {
    id: String
}

type Game = {
    id: String,
    title: String,
    platform: Array<String>
}

type Author = {
    id: String,
    name: String,
    verified: Boolean
}

type Review = {
    id: String,
    rating: Number,
    content: String,
    author_id: String,
    game_id: String
}

const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        author_id: String!,
        game_id: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        games: [Game]
        game(id: ID!): Game

        reviews: [Review]
        review(id: ID!): Review

        authors: [Author]
        author(id:ID!): Author
    }
`

const resolvers = {
    Query: {
        //Gets
        games: () => games,
        game: (_: any, args: QueryArgs) => {
            return games.find((game) => game.id === args.id);
        },
        authors: () => authors,
        author: (_: any, args: QueryArgs) => {
            return authors.find((author) => author.id === args.id);
        },
        reviews: () => reviews,
        review: (_: any, args: QueryArgs) => {
            return reviews.find((review) => review.id === args.id);
        },
    },

    //Joins
    Game: {
        reviews: (parent: Game) => {
            return reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews: (parent: Author) => {
            return reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        author: (parent: Review) => {
            return authors.find((author) => author.id === parent.author_id);
        },
        game: (parent: Review) => {
            return games.find((game) => game.id === parent.game_id);
        }
    },
};

export { typeDefs, resolvers }