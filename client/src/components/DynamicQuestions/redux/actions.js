export const CREATE_ANSWER = 'CREATE_ANSWER';
export const createAnswers = (data, key) => ({
    type: CREATE_ANSWER,
    payload: { data, key },
});

export const CREATE_REGISTER_POST = 'CREATE_REGISTER_POST';
export const createPost = (data, key) => ({
    type: CREATE_REGISTER_POST,
    payload: { data, key },
});

export const POST_SUCCESS = 'POST_SUCCESS';
export const postSuccess = (data, key) => ({
    type: POST_SUCCESS,
    payload: { data, key },
});

