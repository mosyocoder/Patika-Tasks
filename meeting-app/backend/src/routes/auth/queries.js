export const IS_EXIST_USER = `
    query isExistsEmail($email: String!){
        meetingApp_users(
            where:{
                email:{
                    _eq: $email
                }
            }
        ){
            id
        }
    }
`;

export const INSERT_USER_MUTATION = `
    mutation insertUser($input:meetingApp_users_insert_input!){
        insert_meetingApp_users_one(
            object:$input
        ){
            id
            email
        }
    }
`;

export const LOGIN_QUERY = `
    query Users($email:String!){
        meetingApp_users(
            where:{
                email:{
                    _eq: $email
                },
            },
            limit:1
        ){
            id
            email
            password
        }
    }
`;
