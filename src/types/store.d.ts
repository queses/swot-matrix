import { tStateTask } from './task'
import { tStateProject } from './project'
import { Store } from 'redux';

export type tStoreState = {
  task: tStateTask,
  project: tStateProject
}

export type tStore = Store<tStoreState>

export default tStoreState