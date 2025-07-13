CREATE TABLE IF NOT EXISTS "dragonball_planet" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dragonball_planet_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"image" text,
	"races" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dragonball_transformation" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dragonball_transformation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"ki" integer,
	"image" text,
	"description" text,
	"characters" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
