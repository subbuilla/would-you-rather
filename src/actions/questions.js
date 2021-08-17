import {_saveQuestion,_saveQuestionAnswer} from '../utils/_DATA.js'
import {handleAddQesnToUser,handleAddAnsToUser} from './users'
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function getQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question){
    return {
        type:ADD_QUESTION,
        question
    }
}

export function answerQuestion(answerObject){
    return {
        type: ANSWER_QUESTION,
        answerObject 
    }
}

export function handleAddQuestion(question){
    return (dispatch)=>{
        dispatch(showLoading())
        return _saveQuestion(question).then((question)=>{
            dispatch(handleAddQesnToUser(question))
            dispatch(addQuestion(question))
            dispatch(hideLoading())
        })
    }
}

export function handleAddAnswer(answerObject){
    return (dispatch)=>{
        dispatch(showLoading())
        return _saveQuestionAnswer(answerObject).then(()=>{
            dispatch(handleAddAnsToUser(answerObject))
            dispatch(answerQuestion(answerObject))
            dispatch(hideLoading())
        })
    }
}
