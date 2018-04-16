import {
    GET_ALL_SEMESTER,
    ADD_SEMESTER,
    DEL_SEMESTER_BY_ID,
    EDIT_SEMESTER_BY_ID,
    GET_ALL_COURSE,
    ADD_COURSE,
    DEL_COURSE_BY_ID,
    EDIT_COURSE_BY_ID
} from '../constants/ActionType.js';

import { combineReducers } from 'redux';


function semesters(defaultState,action){
    if(!defaultState){
        defaultState = {semesters:[]};
    }
    switch (action.type){
        case GET_ALL_SEMESTER:
            return {semesters:action.semesters};
        case ADD_SEMESTER:
            return {semesters:[...defaultState.semesters,action.semester]};
        case DEL_SEMESTER_BY_ID:
            let index = 0;
            for(let i= 0;i<defaultState.semesters.length;i++){
                if(defaultState.semesters.semesterId===action.semesterId){
                    index = i;
                }
            }
            return {semesters:[
                ...defaultState.semesters.slice(0,index),
                ...defaultState.semesters.slice(index+1)
            ]};
        case EDIT_SEMESTER_BY_ID:
            let index2 = 0;
            for(let i= 0;i<defaultState.semesters.length;i++){
                if(defaultState.semesters.semesterId===action.semesterId){
                    index2 = i;
                }
            }
            return {semesters:[
                ...defaultState.semesters.slice(0,index2),
                action.semester,
                ...defaultState.semesters.slice(index2+1)
            ]};
        default: return defaultState;
    }
}

function courses(defaultState,action){
    if(!defaultState){
        defaultState = {currentCourseList:[],historyCourseList:[]};
    }
    switch (action.type){
        case GET_ALL_COURSE:
            return {
                currentCourseList:action.courses.currentCourseList,
                historyCourseList:action.courses.historyCourseList
            };
        case ADD_COURSE:
            return {
                currentCourseList:[...defaultState.currentCourseList,action.course],
                historyCourseList:defaultState.historyCourseList
            };
        case DEL_COURSE_BY_ID:
            let index = 0;
            for(let i= 0;i<defaultState.currentCourseList.length;i++){
                if(defaultState.currentCourseList.courseId===action.courseId){
                    index = i;
                }
            }
            return {
                currentCourseList:[
                ...defaultState.currentCourseList.slice(0,index),
                ...defaultState.currentCourseList.slice(index+1)],
                historyCourseList:defaultState.historyCourseList
            };
        case EDIT_COURSE_BY_ID:
            let index1 = 0;
            for(let i= 0;i<defaultState.currentCourseList.length;i++){
                if(defaultState.currentCourseList.courseId===action.courseId){
                    index1 = i;
                }
            }
            return {currentCourseList:[
                ...defaultState.currentCourseList.slice(0,index1),
                action.course,
                ...defaultState.currentCourseList.slice(index1+1)],
                historyCourseList:defaultState.historyCourseList
            };
        default: return defaultState;
    }
}

const signApp = combineReducers({
    semesters,
    courses
});

export default signApp;
