// Actions constanst:
import * as actions from '../actions/task-actions'
import { iTask, tPartedTasks, tStateTask } from 'types/task'
import { nActions } from 'types/task'
import { tasksInitial } from '../selectors/task-selectors'
import { MatrixPartEnum } from 'scripts/enums/MatrixPart';

export const getInitialState = (): tStateTask => ({
  tasks: tasksInitial(),
  taskCounter: 0,
  partTaskCounter: {},
  goodsCounter: 0,
  badsCounter: 0,
  error: ''
})

export const initState = (state, { projectTitle }: { projectTitle: string }): tStateTask => {
  if (window) {
    const prefix = 'rt_' +  projectTitle + '_'
    let tasksStr = localStorage.getItem(prefix + 'tasks')
    let taskCounterStr = localStorage.getItem(prefix + 'task-counter')
    let partTaskCounterStr = localStorage.getItem(prefix + 'part-task-counter')
    let goodsCounterStr = localStorage.getItem(prefix + 'goods-counter')
    let badsCounterStr = localStorage.getItem(prefix + 'bads-counter')

    if (tasksStr) {
      try {
        state.tasks = JSON.parse(tasksStr)
        state.taskCounter = parseInt(taskCounterStr) || 0
        state.partTaskCounter = JSON.parse(partTaskCounterStr)
        state.goodsCounter = parseInt(goodsCounterStr) || 0
        state.badsCounter = parseInt(badsCounterStr) || 0
      } catch (err) {
        return state
      }
    }
    console.log(state)
  }
  return state
}

export default (state = getInitialState(), action: any) => {
  switch (action.type) {
    case actions.INIT:
      return initState({ ...state }, action)

    case actions.ADD_TASK:
      return addTask({ ...state }, action)

    case actions.EDIT_TASK:
      return editTask({ ...state }, action)

    case actions.CHANGE_TASK_PART:
      return changeTaskPart({ ...state }, action)

    case actions.DELETE_TASK:
      return deleteTask({ ...state }, action)

    case actions.DELETE_TASKS:
      return deleteTasks({ ...state })

    case actions.SET_PRIOR_RATING:
      return setRating({ ...state }, 'prior', action)

    case actions.SET_PROB_RATING:
      return setRating({ ...state }, 'prob', action)

    case actions.TOGGLE_ERROR:
      return { ...state, ...{ error: action.error } }

    case actions.LOAD_TASKS:
      return loadTasks({ ...state }, action)

    default:
      return state
  }
}

const addTask = (state: tStateTask, action) => {
  const newTask: iTask = {
    title: action.title,
    text: action.text,
    matrixPart: action.matrixPart,
    id: ++state.taskCounter,
    probRating: 0,
    priorRating: 0,
    weight: 1
  }
  state.tasks[action.matrixPart].push(newTask)

  _incPartTaskCount(state, action.matrixPart, newTask.weight)
  return state
}

const editTask = (state: tStateTask, { task }: { task: iTask }) => {
  let pt = task.matrixPart
  const i = state.tasks[pt].findIndex((loTask: iTask) => task.id === loTask.id)
  if (i < 0) throw 'IndexError'
  state.tasks[pt].splice(i, 1, task)
  return state
}

const changeTaskPart = (state: tStateTask, { id, oldPart, newPart }: nActions.tChangeTaskPart) => {
  const i = state.tasks[oldPart].findIndex((task: iTask) => task.id === id)
  if (i < 0) throw 'IndexError'
  let task = state.tasks[oldPart][i]
  task.matrixPart = newPart
  state.tasks[newPart] = [ task ].concat(state.tasks[newPart])
  state.tasks[oldPart].splice(i, 1)

  let decWeight = task.weight
  let incWeight = task.weight
  // if (oldPart === MatrixPartEnum.STRENGTHS || oldPart === MatrixPartEnum.WEAKNESS) {
  //   decWeight = 1
  //   if (newPart == MatrixPartEnum.STRENGTHS)
  // } else if (newPart === MatrixPartEnum.STRENGTHS || newPart === MatrixPartEnum.WEAKNESS) {
  //   incWeight = 1
  // }
  _decPartTaskCount(state, oldPart, decWeight)
  _incPartTaskCount(state, newPart, incWeight)
  return state
}

const deleteTask = (state: tStateTask, { id, matrixPart, weight }: iTask) => {
  const i = state.tasks[matrixPart].findIndex((task: iTask) => task.id === id)
  if (i < 0) throw 'IndexError'
  state.tasks[matrixPart].splice(i, 1)

  _decPartTaskCount(state, matrixPart, weight)
  return state
}

const deleteTasks = (state: tStateTask) => {
  state = getInitialState()
  return state
}

const loadTasks = (state: tStateTask, { tasks }: { tasks: tPartedTasks }) => {
  state.tasks = tasks
  return state
}

const setRating = (state: tStateTask, type, { id, part, rating = 2 }) => {
  const i = state.tasks[part].findIndex((task: iTask) => task.id === id)
  let task: iTask = state.tasks[part][i]
  if (type === 'prior') task.priorRating = rating
  else task.probRating = rating

  _decPartTaskCount(state, part, task.weight)
  task.weight = _calculateWeight(task)
  _incPartTaskCount(state, part, task.weight)
  console.log('DEV Man Goes Down', state)
  return state
}

const _incPartTaskCount = (state: tStateTask, part: number, weight: number) => {
  if (_isPartStrOrWeak(part)) weight = 1

  if (_isPartGood(part)) state.goodsCounter += weight
  else if (_isPartBad(part)) state.badsCounter += weight

  if (state.partTaskCounter[part]) state.partTaskCounter[part] += weight
  else state.partTaskCounter[part] = weight
}

const _decPartTaskCount = (state: tStateTask, part: number, weight: number) => {
  if (_isPartStrOrWeak(part) || isNaN(weight)) weight = 1
  
  if (_isPartGood(part)) state.goodsCounter -= weight
  else if (_isPartBad(part)) state.badsCounter -= weight

  if (state.partTaskCounter[part] > weight) state.partTaskCounter[part] -= weight
  else state.partTaskCounter[part] = 0
}

const _calculateWeight = (task: iTask) => {
  const diff = 3 - task.probRating
  if ((task.priorRating === 2 && task.probRating === 1) 
    || (task.priorRating === 1 && task.probRating === 2)) return 0.5
  else if (task.priorRating === 1 && task.probRating === 1) return 0
  else return task.priorRating - diff
}

const _isPartStrOrWeak = (part) => part === MatrixPartEnum.STRENGTHS || part === MatrixPartEnum.WEAKNESS
// const _isPartNeutral = (part) => part === MatrixPartEnum.NEUTRAL
const _isPartGood = (part) => part === MatrixPartEnum.STRENGTHS || part === MatrixPartEnum.OPPORTUNITIES
const _isPartBad = (part) => part === MatrixPartEnum.WEAKNESS || part === MatrixPartEnum.THREATS
