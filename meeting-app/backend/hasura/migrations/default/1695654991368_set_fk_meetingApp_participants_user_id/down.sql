alter table "meetingApp"."participants" drop constraint "participants_user_id_fkey",
  add constraint "participants_user_id_fkey"
  foreign key ("user_id")
  references "meetingApp"."users"
  ("id") on update restrict on delete restrict;
