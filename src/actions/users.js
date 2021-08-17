
export const RECEIVE_USERS = 'RECEIVE_USERS'

export const APPEND_QUESTION_TO_USER ='APPEND_QUESTION_TO_USER'

export const APPEND_ANSWER_TO_USER = 'APPEND_ANSWER_TO_USER'

export function getUsers(users){
    return {
        type:RECEIVE_USERS,
        users
    }
}


export function addQesnToUser(question){
    return {
        type: APPEND_QUESTION_TO_USER,
        question

    }
}

export function addAnsToUser(answerObject){
    return {
        type: APPEND_ANSWER_TO_USER,
        answerObject

    }
}

export function handleAddQesnToUser(question){

    return (dispatch)=>{
        dispatch(addQesnToUser(question))
    }
}

export function handleAddAnsToUser(answerObject){

    return (dispatch)=>{
        dispatch(addAnsToUser(answerObject))
    }

}