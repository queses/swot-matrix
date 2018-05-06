import { init, deleteTasks } from './task-actions'

export const SELECT_PROJECT = 'PROJECT_SELECT_PROJECT'
export const DESELECT_PROJECT = 'PROJECT_DESELECT_PROJECT'
export const DELETE_PROJECT = 'PROJECT_DELETE_PROJECT'

export const selectProject = (title) => (dispatch) => {
    dispatch({ type: SELECT_PROJECT, title })
    dispatch(init({ projectTitle: title }))
}

export const deselectProject = () => ({
    type: DESELECT_PROJECT
})

export const deleteProject = () => (dispatch) => {
    dispatch({ type: DELETE_PROJECT })
    dispatch(deleteTasks())
}
