import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import task from './reducers/task-reducer'
import { localStorageWriter } from './middlewares/middlewares'
import project from './reducers/project-reducer'

import tState from '../types/store'

const reducers = combineReducers<tState>({ task, project })

const store = createStore(
	reducers,
	applyMiddleware(localStorageWriter, thunk)
)

console.log('DEV - Store: ', store)

export default store


