ALTER TABLE "api_dragonball" ALTER COLUMN "ki" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "ki" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "maxKi" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "maxKi" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "race" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "gender" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "image" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ALTER COLUMN "affiliation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "api_dragonball" ADD COLUMN "originPlanetId" integer;--> statement-breakpoint
ALTER TABLE "api_dragonball" ADD COLUMN "deletedAt" timestamp;