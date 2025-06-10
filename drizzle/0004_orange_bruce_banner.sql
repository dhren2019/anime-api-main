ALTER TABLE "api_keys" ADD COLUMN "plan" varchar(20) DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "requestsCount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "api_keys" ADD COLUMN "requestsLimit" integer DEFAULT 10 NOT NULL;