alter table "meetingApp"."meetings" alter column "user_id" set default nextval('"meetingApp".meetings_user_id_seq'::regclass);
