import { authors, games, reviews } from "../database/_db.js";
import { Game, AddGameQuery, EditGameQuery } from "../types/game.types.js";
import { Author } from "../types/author.types.js";
import { Review } from "../types/review.types.js";
import { QueryArgs } from "../types/query.types.js";

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

    type Mutation {
        addGame(game: AddGameInput!) : Game
        updateGame(id: ID!, edits: EditGameInput!) : Game
        deleteGame(id: ID!): [Game]
    }

    input AddGameInput {
        title: String!,
        platform:[String!]!
    }

    input EditGameInput {
        title: String,
        platform:[String!]
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

    //Relations
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

    Mutation: {
        addGame: (_: any, args: AddGameQuery) => {
            //Here you'll save in your database
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 1000).toString()
            }

            games.push(game);

            return game;
        },
        updateGame: (_: any, args: EditGameQuery) => {
            const index = games.findIndex((game) => game.id === args.id);
            if (index === -1) {
                return { error: 'Game Not Found' };
            }

            const newGame = { ...games[index], ...args.edits };
            games[index] = newGame;

            return newGame;

        },
        deleteGame: (_: any, args: QueryArgs) => {
            //Here you'll delete in your database
            const index = games.findIndex((game) => game.id === args.id);
            if (index === -1) {
                return { error: 'Game Not Found' };
            }

            const deleted = games.splice(index, 1);
            return deleted;
        }
    }
};

export { typeDefs, resolvers }