alter table "meetingapp"."meetings"
  add constraint "meetings_user_id_fkey"
  foreign key ("user_id")
  references "meetingapp"."users"
  ("id") on update restrict on delete cascade;
