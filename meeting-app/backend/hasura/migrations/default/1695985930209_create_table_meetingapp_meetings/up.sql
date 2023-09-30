CREATE TABLE "meetingapp"."meetings" ("id" serial NOT NULL, "title" text NOT NULL, "meeting_date" date NOT NULL, "user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "meetingapp"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_meetingapp_meetings_updated_at"
BEFORE UPDATE ON "meetingapp"."meetings"
FOR EACH ROW
EXECUTE PROCEDURE "meetingapp"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_meetingapp_meetings_updated_at" ON "meetingapp"."meetings"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
