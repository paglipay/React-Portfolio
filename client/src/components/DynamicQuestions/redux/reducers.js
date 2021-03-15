import {
    CREATE_ANSWER,
    CREATE_REGISTER_POST,
    POST_SUCCESS
} from './actions';

const initialState = { isLoading: false, results: {}, post_data: {}, post_success: {} };

const output = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_ANSWER: {
            const { data, key } = payload;
            return {
                ...state,
                results: { ...state.results, [key]: data },
            };
        }
        case CREATE_REGISTER_POST: {
            const { data, key } = payload;
            return {
                ...state,
                post_data: { ...state.post_data, [key]: data },
            };
        }
        case POST_SUCCESS: {
            const { data, key } = payload;
            return {
                ...state,
                post_success: { ...state.post_success, [key]: data },
            };
        }
        default:
            return state;
    }
}

export default output