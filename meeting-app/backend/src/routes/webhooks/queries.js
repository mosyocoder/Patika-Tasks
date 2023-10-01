export const GET_MEETING_PARTICIPANTS = `
query getParticipants($id : Int!){
    meetingapp_meetings_by_pk(id:$id){
        title
        meeting_date
        user{
            email
            full_name
        }
        participants{
            user{
                email
            }
        }
    }
  }
`;

export const GET_MEETING_PARTICIPANTS_REMINDER_QUERY = `
query getParticipants($id : Int!){
    meetingapp_meetings_by_pk(id:$id){
        title
        user {
            email
            full_name
        }
        participants(
            where:{
                is_approved:{
                _eq:true
                }
            }){
            user {
                email
            }
        }
    }
  }
`;
