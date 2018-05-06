import React from 'react'
import { fela } from '../scripts/utils'
// import getColor from 'color'
import Task from 'containers/TaskContainer'

import { iTask } from '../types/task'

type tProps = {
  tasks: Array<iTask>,
  isInner?: boolean|string
}

const Tasks = ({ tasks, isInner }: tProps, ctx: any) => {
  const className = ctx.renderer.renderRule(rules)
  const TasksMap = tasks.map((task: iTask) => (
    <Task task={task} key={task.id}/>
  ))
  const TaskList = () => (
    <section className="task-list">
      {isInner || <h3>Список задач</h3>}
      {TasksMap}
    </section>
  )
  return (
    <div className={className}>
      {tasks.length ? <TaskList/> : ''}
    </div>
)}

const rules = () => ({
})

export default fela.context(Tasks)
