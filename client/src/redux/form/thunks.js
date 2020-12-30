import {
    createForm,
    removeForm,
    loadFormsInProgress,
    loadFormsSuccess,
    loadFormsFailure,
    markFormAsCompleted,
} from './actions';

export const loadForms = () => async dispatch => {
    try {
        dispatch(loadFormsInProgress());
        const response = await fetch('http://localhost:3001/forms');
        const forms = await response.json();
        
        await dispatch(loadFormsSuccess(forms));
    } catch (e) {
        dispatch(loadFormsFailure());
        dispatch(displayAlert(e));
    }
}

export const addFormRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:3001/forms', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const form = await response.json();
        dispatch(createForm(form));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeFormRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/forms/${id}`, {
            method: 'delete'
        });
        const removedForm = await response.json();
        dispatch(removeForm(removedForm));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markFormAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/forms/${id}/completed`, {
            method: 'post'
        });
        const updatedForm = await response.json();
        dispatch(markFormAsCompleted(updatedForm));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};