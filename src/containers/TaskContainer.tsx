// import React from 'react'
import { connect } from 'react-redux'
import TaskComponent from 'components/Task'
import { changeTaskPart, editTask, deleteTask, setPriorRating, setProbRating } from 'store/actions/task-actions'
import Validator from '../scripts/Validator'

import { iTask, nActions } from 'types/task'
import tState from 'types/store'
import { allTasks } from 'store/selectors/task-selectors';

type tProps = {
    task: iTask
} 

// Второй аргумент mapState - собственные props
const mapState = ({ task, project }: tState, props: tProps) => {
  let otherTasks = allTasks(task.tasks)

  return {
    ...props,
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
    }
  }
}

// Второй аргумент mapDispatch - собственные props
const mapDispatch = (dispatch, { task }: tProps) => ({
  onDeleteTask: () => {
    dispatch(deleteTask(task))
  },
  onChangeTaskPart: (change: nActions.tChangeTaskPart) => {
    dispatch(changeTaskPart(change))
  },
  onSetRating: (type, rating) => {
    const { id, matrixPart } = task
    if (type === 'prior') dispatch(setPriorRating({ id, rating, matrixPart }))
    else dispatch(setProbRating({ id, rating, matrixPart }))
  },
  onEditTask: (edited: iTask) => {
    dispatch(editTask(edited))
  }
})

export default connect(mapState, mapDispatch)(TaskComponent)
