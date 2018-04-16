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
import fetch from 'isomorphic-fetch';
import {CONFIG} from "../constants/conifg";
const {server} = CONFIG;

const getAllSemester=(semesters)=>{
    const url = server + '/semester';
    return{
        type:GET_ALL_SEMESTER,
        semesters
    }
};

const addSemester=(semester)=>{
    return{
        type:ADD_SEMESTER,
        semester
    }
};

const delSemesterById=(semesterId)=>{
    return{
        type:DEL_SEMESTER_BY_ID,
        semesterId
    }
};

const editSemesterById=(semesterId,semester)=>{
    return{
        type:EDIT_SEMESTER_BY_ID,
        semesterId,
        semester
    }
};
const getAllCourse=(name)=>{
    return dispatch=>{
        const url = `${server}/course?name=${name}`;
        return fetch(url,{
            method:'get',
            mode: 'cors',
            credentials:'include'
        }).then((res)=>{
            return res.json()
        }).then(data=>{
            dispatch({
                type:GET_ALL_COURSE,
                courses:data
            })
        })
    }
};

const addCourse=(course)=>{
    return dispatch=>{
        const url = `${server}/course`;
        return fetch(url,{
            method:'post',
            mode: 'cors',
            credentials:'include',
            body:JSON.stringify(course)
        }).then((res)=>{
            return res.json()
        }).then(()=>{
            dispatch({
                type:ADD_COURSE,
                course:course
            });
        })
    }
};

const delCourseById=(courseId)=>{
    return{
        type:DEL_COURSE_BY_ID,
        courseId
    }
};

const editCourseById=(courseId,course)=>{
    return dispatch=>{
        const url = `${server}/course`;
        return fetch(url,{
            method:'post',
            mode: 'cors',
            credentials:'include',
            body:JSON.stringify(course)
        }).then((res)=>{
            return res.json()
        }).then(()=>{
            dispatch({
                type:EDIT_COURSE_BY_ID,
                courseId,
                course
            });
        })
    }
};

export {
    getAllCourse,
    getAllSemester,
    addCourse,
    addSemester,
    delCourseById,
    delSemesterById,
    editCourseById,
    editSemesterById
}