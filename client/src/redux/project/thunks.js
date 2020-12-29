import {
    createProject,
    removeProject,
    loadProjectsInProgress,
    loadProjectsSuccess,
    loadProjectsFailure,
    markProjectAsCompleted,
} from './actions';

export const loadProjects = () => async dispatch => {
    try {
        dispatch(loadProjectsInProgress());
        const response = await fetch('http://localhost:3001/projects');
        const projects = await response.json();
        
        await dispatch(loadProjectsSuccess(projects));
    } catch (e) {
        dispatch(loadProjectsFailure());
        dispatch(displayAlert(e));
    }
}

export const addProjectRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:3001/projects', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const project = await response.json();
        dispatch(createProject(project));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeProjectRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/projects/${id}`, {
            method: 'delete'
        });
        const removedProject = await response.json();
        dispatch(removeProject(removedProject));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markProjectAsCompletedRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:3001/projects/${id}/completed`, {
            method: 'post'
        });
        const updatedProject = await response.json();
        dispatch(markProjectAsCompleted(updatedProject));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};