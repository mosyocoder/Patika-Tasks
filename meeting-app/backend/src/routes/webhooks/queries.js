export const GET_MEETING_PARTICIPANTS = `
query getParticipants($meeting_id : Int!){
    meetingapp_participants(
      where:{
        meeting_id:{_eq:$meeting_id}
      }
    ){
      user{
        id
        email
        full_name
      }
    }
  }
`;
