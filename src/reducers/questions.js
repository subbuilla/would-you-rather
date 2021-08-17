import { ADD_QUESTION, ANSWER_QUESTION,RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions(state={},action){
    switch(action.type){
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id] : action.question
            }
        case ANSWER_QUESTION:
            const {answerObject} = action
            const {qid,answer,authedUser} = answerObject
            return {
                ...state,
                [qid]:{
                    ...state[qid],
                    [answer]:{
                        ...state[qid][answer],
                        votes : state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        default:
            return state
    }
}