CREATE TABLE IF NOT EXISTS "api_dragonball" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "api_dragonball_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"race" varchar(100),
	"gender" varchar(50),
	"ki" integer,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "dragonball_id" integer;