import * as actions from '../actions/project-actions'
import { tStateProject } from 'types/project'

const getInitialState = () => {
    let initial: tStateProject = {
        selectedProject: "",
        projects: []
    }

    if (window) {
        let projectsStr = localStorage.getItem('rt_projects')
        if (projectsStr) {
            try {
                initial.projects = JSON.parse(projectsStr)
            } catch (err) {
                return initial
            }
        }
    }
    return initial
}

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case actions.SELECT_PROJECT: return selectProject({ ...state }, action)
        case actions.DESELECT_PROJECT: return deselectProject({ ...state })
        case actions.DELETE_PROJECT: return deleteProject({ ...state })

        default:
            return state
    }
}

const selectProject = (state: tStateProject, { title }) => {
    if (state.projects.indexOf(title) < 0) {
        state.projects.push(title)
    }
    state.selectedProject = title
    return state
}

const deselectProject = (state: tStateProject) => {
    state.selectedProject = ""
    return state
}

const deleteProject = (state: tStateProject) => {
    state.projects.splice(state.projects.indexOf(state.selectedProject), 1)
    state.selectedProject = ""
    console.log(state.selectedProject)
    return state
}