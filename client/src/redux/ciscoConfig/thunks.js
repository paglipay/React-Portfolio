import {
    createConfig,
    removeConfig,
    loadConfigsInProgress,
    loadConfigsSuccess,
    loadConfigsFailure,
    markConfigAsCompleted,
} from './actions';

export const loadConfigs = () => async dispatch => {
    try {
        dispatch(loadConfigsInProgress());
        const response = await fetch('http://localhost:3001/configs');
        const configs = await response.json();
        
        await dispatch(loadConfigsSuccess(configs));
    } catch (e) {
        dispatch(loadConfigsFailure());
        dispatch(displayAlert(e));
    }
}

export const addConfigRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:3001/configs', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const config = await response.json();
        dispatch(createConfig(config));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeConfigRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/configs/${id}`, {
            method: 'delete'
        });
        const removedConfig = await response.json();
        dispatch(removeConfig(removedConfig));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markConfigAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/configs/${id}/completed`, {
            method: 'post'
        });
        const updatedConfig = await response.json();
        dispatch(markConfigAsCompleted(updatedConfig));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};