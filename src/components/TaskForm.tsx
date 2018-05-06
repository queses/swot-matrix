import React from 'react'
import { fela } from '../scripts/utils'
import getColor from 'color'
// import { iTask } from '../types/main'
import { PART_COLORS } from './Matrix'

type tProps = {
  errors: Array<any>
  projectTitle: string,
  onAddTask: Function
  onDeleteTasks: Function
  validateTask: Function
  onToggleError: Function
  onDeleteProject: Function
}

class TaskForm extends React.Component<tProps, any> {
  constructor (props) {
    super(props)
    this.state = { taskTitle: '', taskText: '', taskNum: 0, taskMatrixPart: 0 }
  }

  render () {
    const ps = this.props
    const st = this.state
    const onClickImportancy = num => event => this.onClickImportancy(event, num)

    const ImportancyBtns = [0, 1, 2, 3, 4].map((num) => {
      const isBtnActive = num === st.taskMatrixPart
      const btnActiveClass: string = (isBtnActive ? `importancy-btn-${num}_active` : '')
      return (
        <button
          className={`importancy-btn importancy-btn-${num} ${btnActiveClass}`}
          key={num}
          onClick={onClickImportancy(num)}
        >
          {'✓'} 
        </button>
    )})
    
    const Errors = ps.errors ? <p className="errors">{ps.errors}</p> : ''

    return (
      <div className={fela.renderComponent(this, styles)}>
        <h2>{ps.projectTitle}</h2>
        <h4>Добавить задачу</h4>
        <form className="add-task-form pure-form">
          <fieldset className="pure-group">
            <input
              placeholder="Название"
              type="text"
              className="pure-input-2-3"
              value={st.taskName}
              onChange={this.onChangeTitle}
            />
            <textarea
              className="pure-input-2-3"
              placeholder="Текст задачи"
              value={st.taskText}
              onChange={this.onChangeText}
            />
          </fieldset>
          <div className="importancy-btns">{ImportancyBtns}</div>
          <button
            className="pure-button pure-button-primary"
            onClick={this.onAddTaskClick}
          >
            Добавить
          </button>
          <button className="pure-button pure-button-warning" onClick={this.onDelTasksClick}>
            Очистить
          </button>
        {Errors}
        </form>
        <a href="#" className="delete-project" onClick={this.onDelProjectClick}>Удалить проект</a>
      </div>
  )}

  onChangeTitle = ({ target }) => {
    this.setState({ taskTitle: target.value })
  }

  onChangeText = ({ target }) => {
    this.setState({ taskText: target.value })
  }

  onClickImportancy = (e, num) => {
    e.preventDefault()
    this.setState({ taskMatrixPart: num })
  }

  onAddTaskClick = (e) => {
    e.preventDefault()
    const task = {
      title: this.state.taskTitle,
      text: this.state.taskText,
      matrixPart: this.state.taskMatrixPart
    }
    const errors = this.props.validateTask(task)
    if (!errors) this.props.onAddTask(task)
    else this.props.onToggleError(errors)
  }
    
  onDelTasksClick = (e) => {
    e.preventDefault()
    const c: boolean = confirm('Удалить все задачи?')
    if (c) this.props.onDeleteTasks()
  }

  onDelProjectClick = (e) => {
    e.preventDefault()
    const c: boolean = confirm('Удалить проект?')
    if (c) this.props.onDeleteProject()
  }
}

const styles = (ps) => ({
  '& h4': {
    marginBottom: '1ex'  
  },

  '& a.delete-project': {
    display: 'block',
    marginTop: '2ex'
  },

  '& .pure-button-warning': {
    backgroundColor: '#fba335',
    color: 'white',
    marginLeft: '1em'
  },

  '& .importancy-btn': {
    minHeight: '3ex',
    minWidth: '3ex',
    border: 'grey solid 1px',
    marginRight: '.5ex',
    color: 'rgba(0, 0, 0, 0)',
    marginBottom: '2ex'
  },

  '& .importancy-btn-0': getImpBtnStyle(0),

  '& .importancy-btn-1': getImpBtnStyle(1),

  '& .importancy-btn-2': getImpBtnStyle(2),

  '& .importancy-btn-3': getImpBtnStyle(3),

  '& .importancy-btn-4': getImpBtnStyle(4)
})

const getImpBtnStyle = (num: number) => {
  let color = (num ? getColor(PART_COLORS[num - 1]) : getColor('white'))
  return {
    backgroundColor: color.hex(),
    borderColor: color.darken(0.2).hex(),

    '&_active': {
      color: 'black'
    },

    '&:hover': {
      backgroundColor: color.lighten(0.2).hex()
    }
  }
}

export default fela.context(TaskForm)
