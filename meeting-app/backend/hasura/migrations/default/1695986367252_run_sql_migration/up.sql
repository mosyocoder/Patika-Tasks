CREATE OR REPLACE FUNCTION meetingapp.full_name(user_row meetingapp.users) RETURNS text LANGUAGE sql STABLE AS $function$ SELECT user_row.name || ' ' || user_row.surname $function$;
