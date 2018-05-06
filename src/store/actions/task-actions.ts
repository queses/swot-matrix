import { iTask, tPartedTasks } from 'types/task'
import { nActions } from 'types/task'

export const INIT = 'MAIN_INIT'
export const ADD_TASK = 'TASK_ADD_TASK'
export const EDIT_TASK = 'TASK_EDIT_TASK'
export const DELETE_TASK = 'TASK_DELETE_TASK'
export const TOGGLE_ERROR = 'TASK_TOGGLE_ERROR'
export const DELETE_TASKS = 'TASK_DELETE_TASKS'
export const CHANGE_TASK_PART = 'TASK_CHANGE_TASK_PART'
export const LOAD_TASKS = 'TASK_LOAD_TASKS'
export const SET_PRIOR_RATING = 'TASK_SET_PRIOR_RATING'
export const SET_PROB_RATING = 'TASK_SET_PROB_RATING'

export const init = ({ projectTitle }: { projectTitle: string }) => ({
  type: INIT,
  projectTitle
})

export const addTask = ({ title, text, matrixPart }: iTask) => ({
  type: ADD_TASK,
  title,
  text,
  matrixPart
})

export const editTask = (task: iTask) => ({
  type: EDIT_TASK,
  task
})

export const deleteTask = ({ id, matrixPart }: iTask) => ({
  type: DELETE_TASK,
  id,
  matrixPart
})

export const deletePartedTask = ({ id, matrixPart }: iTask) => ({
  type: DELETE_TASK,
  id,
  matrixPart
})

export const toggleError = (error: string) => ({
  type: TOGGLE_ERROR,
  error
})

export const deleteTasks = () => ({
  type: DELETE_TASKS
})

export const changeTaskPart = ({ id, oldPart, newPart }: nActions.tChangeTaskPart) => ({
  type: CHANGE_TASK_PART,
  id,
  oldPart,
  newPart
})

export const loadTasks = (tasks: tPartedTasks) => ({
  type: LOAD_TASKS,
  tasks
})

export const setPriorRating = ({ id, rating, matrixPart }: { id: number, matrixPart: number, rating: number }) => ({
  type: SET_PRIOR_RATING,
  id,
  rating,
  part: matrixPart
})

export const setProbRating = ({ id, rating, matrixPart }: { id: number, matrixPart: number, rating: number }) => ({
  type: SET_PROB_RATING,
  id,
  rating,
  part: matrixPart
})
