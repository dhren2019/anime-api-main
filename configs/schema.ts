import { integer, pgTable, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const apiKeysTable = pgTable("api_keys", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().references(() => usersTable.id).notNull(),
    name: varchar({ length: 255 }).notNull(),
    key: varchar({ length: 255 }).notNull().unique(),
    lastUsed: timestamp().defaultNow(),
    createdAt: timestamp().defaultNow().notNull(),
    isActive: boolean().default(true).notNull(),
    plan: varchar({ length: 20 }).default('free').notNull(), // free o pro
    requestsCount: integer().default(0).notNull(),
    requestsLimit: integer().default(10).notNull(),
});

export const animesTable = pgTable("animes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 50 }), // TV, Movie, OVA, etc.
    episodes: integer(),
    status: varchar({ length: 50 }), // Finished, Currently Airing, etc.
    animeSeason: varchar({ length: 50 }), // Season info
    picture: text(), // URL to the picture
    thumbnail: text(), // URL to the thumbnail
    sources: text().array(), // Array of source URLs
    synonyms: text().array(), // Alternative titles
    relations: text().array(), // Related anime URLs
    tags: text().array(), // Tags/genres
    dragonball_id: integer(), // Nueva columna para relacionar con api_dragonball
});

export const apiDragonballTable = pgTable("api_dragonball", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    ki: integer(),
    maxKi: integer(),
    race: varchar({ length: 100 }),
    gender: varchar({ length: 50 }),
    description: text(),
    image: text(),
    affiliation: varchar({ length: 255 }),
    originPlanet: varchar({ length: 255 }),
    transformations: text(), // JSON stringified array
    family: text(), // JSON stringified array
    saga: varchar({ length: 255 }),
    height: varchar({ length: 50 }),
    weight: varchar({ length: 50 }),
    hair: varchar({ length: 100 }),
    eyes: varchar({ length: 100 }),
    deceased: boolean(),
    debut: text(), // JSON stringified object
    relatives: text(), // JSON stringified array
    techniques: text(), // JSON stringified array
    createdAt: timestamp().defaultNow().notNull(),
});