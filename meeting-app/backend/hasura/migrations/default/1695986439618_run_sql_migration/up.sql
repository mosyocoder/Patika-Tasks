CREATE OR REPLACE FUNCTION meetingApp.full_name(user_row meetingApp.users) RETURNS text LANGUAGE sql STABLE AS $function$ SELECT user_row.name || ' ' || user_row.surname $function$;
