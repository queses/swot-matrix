import * as taskActions from '../actions/task-actions'
import * as projectActions from '../actions/project-actions'
import { tStore } from 'types/store';

export const localStorageWriter = store => next => action => {
  if (!action.type) return next(action)

  // Вызывает next(), чтобы миддлвар вызывался после действия
  const result = next(action)

  if (action.type === projectActions.SELECT_PROJECT || action.type === projectActions.DELETE_PROJECT) {
    localStorage.setItem('rt_projects', JSON.stringify(
      (store as tStore).getState().project.projects.concat())
    )
    console.log('DEV MV STATE:', store.getState())
  }
  else if (action.type.substr(0, 5) === 'TASK_' && action.type !== taskActions.INIT) {
    const state = (store as tStore).getState().task
    const prefix = 'rt_' +  store.getState().project.selectedProject + '_'

    localStorage.setItem(prefix + 'tasks', JSON.stringify(state.tasks))
    localStorage.setItem(prefix + 'task-counter', state.taskCounter.toString())
    localStorage.setItem(prefix + 'part-task-counter', JSON.stringify(state.partTaskCounter))
    localStorage.setItem(prefix + 'goods-counter', JSON.stringify(state.goodsCounter))
    localStorage.setItem(prefix + 'bads-counter', JSON.stringify(state.badsCounter))
  }
  return result
}
