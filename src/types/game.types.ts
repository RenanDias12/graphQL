type Game = {
    id: String,
    title: String,
    platform: Array<String>
}

type AddGameQuery = {
    game: {
        title: String,
        platform: Array<String>
    }
}

type EditGameQuery = {
    id: String,
    edits: {
        title: String,
        platform: Array<String>
    }
}

export { Game, AddGameQuery, EditGameQuery }