import React from 'react'
import { connect } from 'react-redux'
import TasksComponent from 'components/Tasks'
import TaskFormComponent from 'components/TaskForm'
import { addTask, deleteTasks, toggleError } from 'store/actions/task-actions'
import { deleteProject } from 'store/actions/project-actions'
import { allTasks } from '../store/selectors/task-selectors'
import Validator from '../scripts/Validator'

import { iTask } from 'types/task'
import tState from 'types/store'

class Container extends React.Component<any, any> {
  constructor (props) {
    super(props)
 }

  render () {
    const ps = this.props
    return (
      <div>
        <TaskFormComponent
          errors={ps.errors}
          projectTitle={ps.projectTitle}
          validateTask={ps.validateTask}
          onAddTask={ps.onAddTask}
          onToggleError={ps.onToggleError}
          onDeleteTasks={ps.onDeleteTasks}
          onDeleteProject={ps.onDeleteProject}
        />
        <TasksComponent tasks={ps.tasks} />
      </div>
  )}
}

// Второй аргумент mapState - собственные props
const mapState = ({ task, project }: tState) => {
  let otherTasks = allTasks(task.tasks)

  return {
    tasks: task.tasks[0],
    errors: task.error,
    validateTask: (validated: iTask) => {
      const rules = [
        {attrs: ['title'], required: true},
        {attrs: ['title'], string: {max: 128}},
        {attrs: ['text'], string: {max: 512}},
        {attrs: ['title'], unique: {key: 'title', values: otherTasks}}
      ]
      let validator = new Validator(rules, validated)
      validator.validate()
      return validator.message
    },
    projectTitle: project.selectedProject
  }
}

// Второй аргумент mapDispatch - собственные props
const mapDispatch = (dispatch) => ({
  onAddTask: (task: iTask) => {
    dispatch(addTask(task))
  },
  onToggleError: (message: string) => {
    dispatch(toggleError(message))
    setTimeout(() => {
      dispatch(toggleError(''))
    }, 3000)
  },
  onDeleteTasks: () => {
    dispatch(deleteTasks())
  },
  onDeleteProject: () => {
    dispatch(deleteProject())
  }
})

export default connect(mapState, mapDispatch)(Container)