DO $$ BEGIN
 ALTER TABLE "api_dragonball" ADD CONSTRAINT "api_dragonball_originPlanetId_dragonball_planet_id_fk" FOREIGN KEY ("originPlanetId") REFERENCES "public"."dragonball_planet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "api_dragonball" DROP COLUMN IF EXISTS "deletedAt";--> statement-breakpoint
ALTER TABLE "api_dragonball" DROP COLUMN IF EXISTS "originPlanet";