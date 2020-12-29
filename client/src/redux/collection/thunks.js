import {
    createCollection,
    removeCollection,
    loadCollectionsInProgress,
    loadCollectionsSuccess,
    loadCollectionsFailure,
    markCollectionAsCompleted,
} from './actions';

export const loadCollections = () => async dispatch => {
    try {
        dispatch(loadCollectionsInProgress());
        const response = await fetch('http://localhost:3001/collections');
        const collections = await response.json();
        
        await dispatch(loadCollectionsSuccess(collections));
    } catch (e) {
        dispatch(loadCollectionsFailure());
        dispatch(displayAlert(e));
    }
}

export const addCollectionRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:3001/collections', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const collection = await response.json();
        dispatch(createCollection(collection));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeCollectionRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/collections/${id}`, {
            method: 'delete'
        });
        const removedCollection = await response.json();
        dispatch(removeCollection(removedCollection));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markCollectionAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/collections/${id}/completed`, {
            method: 'post'
        });
        const updatedCollection = await response.json();
        dispatch(markCollectionAsCompleted(updatedCollection));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};