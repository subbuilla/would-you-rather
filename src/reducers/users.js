import {APPEND_QUESTION_TO_USER, APPEND_ANSWER_TO_USER,RECEIVE_USERS} from '../actions/users'

export default function users(state={},action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case APPEND_QUESTION_TO_USER:
            const {id,author} = action.question
            return {
                ...state,
                [author]: {
                            ...state[author],
                            questions: state[author].questions.concat([id])
                            }
                    }
        case APPEND_ANSWER_TO_USER:
            const {qid,authedUser,answer} = action.answerObject
            return {
                ...state,
                [authedUser]:{
                    ...state[authedUser],
                    answers:{
                        ...state[authedUser].answers,
                        [qid]:answer
                    }
                }
            }
        default:
            return state
    }
}