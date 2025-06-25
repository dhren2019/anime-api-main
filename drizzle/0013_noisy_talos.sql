ALTER TABLE "dragonball_transformation" ALTER COLUMN "ki" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "dragonball_transformation" ADD COLUMN "affiliation" varchar(255);--> statement-breakpoint
ALTER TABLE "dragonball_transformation" ADD COLUMN "maxKi" varchar(255);--> statement-breakpoint
ALTER TABLE "dragonball_transformation" ADD COLUMN "race" varchar(100);--> statement-breakpoint
ALTER TABLE "dragonball_transformation" ADD COLUMN "gender" varchar(50);--> statement-breakpoint
ALTER TABLE "dragonball_transformation" ADD COLUMN "originPlanetId" integer;