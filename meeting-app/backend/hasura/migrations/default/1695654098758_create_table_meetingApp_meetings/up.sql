CREATE TABLE "meetingApp"."meetings" ("id" serial NOT NULL, "title" text NOT NULL, "meeting_date" date NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" serial NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "meetingApp"."users"("id") ON UPDATE restrict ON DELETE cascade);
CREATE OR REPLACE FUNCTION "meetingApp"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_meetingApp_meetings_updated_at"
BEFORE UPDATE ON "meetingApp"."meetings"
FOR EACH ROW
EXECUTE PROCEDURE "meetingApp"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_meetingApp_meetings_updated_at" ON "meetingApp"."meetings"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
