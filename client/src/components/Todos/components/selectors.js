import { createSelector } from 'reselect';

export const getTodos = state => {
    
    console.log('getTodos: ', state)
    return state.todo.data

};
export const getTodosLoading = state => state.isLoading;

export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted),
);

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);
