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
});