alter table "meetingapp"."participants" add column "is_approved" boolean
 not null default 'false';
