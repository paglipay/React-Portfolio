import {
    createAnswers,
    createPost,
    postSuccess,
} from './actions';
import axios from 'axios'

export const addAnswersRequest = (text, key) => async dispatch => {
    try {
        dispatch(createAnswers(text, key));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const addAnswersToPost = (text, key) => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        dispatch(createPost(text, key));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const postAnswers = (text, key) => async dispatch => {
    axios
        // .post(`/api/profiles`, text)
        .post(`/api/${key}`, text)
        .then(response => {
            const data = response.data
            dispatch(postSuccess(data, key));
        })
        .catch((e) => {
            console.log('catch', e)
            dispatch(displayAlert(e))
        })
}

export const getAnswersById = (text, key) => async dispatch => {
    axios
        .get(`/api/profiles/${text}`)
        .then(async response => {
            const data = response.data
            // dispatch(postSuccess(data, key));            
            dispatch(createAnswers(data.results.app_data[key], key));
        })
        .catch((e) => {
            console.log('catch', e)
            dispatch(displayAlert(e))
        })
}

export const getProfiles = (text, key) => async dispatch => {
    axios
        .get(`/api/profiles`)
        .then(async response => {
            const data = response.data
            dispatch(createAnswers(data.results, key));
        })
        .catch((e) => {
            console.log('catch', e)
            dispatch(displayAlert(e))
        })
}

export const displayAlert = text => () => {
    alert(text);
};