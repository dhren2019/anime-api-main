ALTER TABLE "api_keys" ADD COLUMN "lastUsed" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" DROP COLUMN IF EXISTS "timestamptz";