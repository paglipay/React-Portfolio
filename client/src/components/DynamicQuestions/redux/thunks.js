import {
    createAnswers,
    createPost,
    postSuccess
} from './actions';
import axios from 'axios'

export const addAnswersRequest = (text, key) => async dispatch => {
    console.log('text: ', text, key)
    try {
        dispatch(createAnswers(text, key));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const addAnswersToPost = (text, key) => async dispatch => {
    console.log('text: ', text, key)
    try {
        const body = JSON.stringify({ text });
        dispatch(createPost(text, key));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const postAnswers = (text, key) => async dispatch => {
    console.log('text: ', text, key)
    axios
        .post(`/api/orders`, text)
        .then(response => {
            // response.data is the users
            const data = response.data
            console.log('response.data.results: ', data)
            dispatch(postSuccess(data, key));
        })
        .catch((e) => {
            console.log('catch', e)
            dispatch(displayAlert(e))
        })
}

export const getAnswersById = (text, key) => async dispatch => {
    console.log('getAnswersById text: ', text, key)
    axios
        .get(`/api/orders/${text}`)
        .then( async response => {
            // response.data is the users
            const data = response.data
            console.log('response.data.results: ', data)
            dispatch(postSuccess(data, key));            
            dispatch(createAnswers(data.results.profile[key], key));
        })
        .catch((e) => {
            console.log('catch', e)
            dispatch(displayAlert(e))
        })
}

export const displayAlert = text => () => {
    alert(text);
};