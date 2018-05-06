import React from 'react'
import ReactStars from 'react-stars'
import interactjs from 'interactjs'
import { fela, interact } from '../scripts/utils'
// import getColor from 'color'
// import Draggable from './hoc/Draggable'
// import Editable from 'lib/react-inline-editing/EditableLabel'
import { RIEInput } from 'riek'

import { iTask } from '../types/task'
import { MatrixPartEnum } from 'scripts/enums/MatrixPart';

type tProps = {
  onDeleteTask: Function,
  onChangeTaskPart: Function,
  onSetRating: Function,
  onEditTask: Function,
  task: iTask
  x?: number,
  y?: number,
  isDragging?: boolean,
  dragHandlers?: any
}

class Task extends React.Component<tProps, any> {
  private taskRef?: JSX.Element

  render () {
    const { task } = this.props
    const taskRef = node => { this.taskRef = node }

    const TaskStars = () => (
      <div className="card__content pure-g">
        <div className="task__rating pure-u-1-2">
          <span className="task__rating-text">{this.getPriorRatingLabel()}:</span> <ReactStars
            count={3}
            size={20}
            color2={'#ffd700'}
            half={false}
            className="task__rating-stars"
            onChange={this.onChangePriorRating}
            value={task.priorRating}
          />
        </div>
        <div className="task__rating-stars pure-u-1-2">
          <span className="task__rating-text">Вероятность:</span> <ReactStars
            count={3}
            size={20}
            color2={'#ffd700'}
            half={false}
            className="task__stars"
            onChange={this.onChangeProbRating}
            value={task.probRating}
          />
        </div>
      </div>
    )
    const toShowTaskStars = (task.matrixPart === MatrixPartEnum.OPPORTUNITIES
      || task.matrixPart === MatrixPartEnum.THREATS)

    return (
      <div className={fela.renderComponent(this, rules)}>
        <div ref={taskRef} className="card">
          <button className="card__close fa fa-times" onClick={this.onDeleteTask}/>
          {/* <h4 className="card__title">{task.title}</h4> */}
          <h4 className="card__title"><RIEInput value={task.title} change={this.onTitleChange} propName='title'/></h4>
          
          {toShowTaskStars && <TaskStars/>}
          {/* <button className="card__close" onClick={onDelete(task)}>x</button> */}
          {/* <p className="card__text">{task.text}</p> */}
        </div>
      </div>
  )}

  componentDidMount () {
    // interactjs(this.refs['task']).draggable({
    //   onmove: this.props.dragHandlers.onDrag,
    //   onend: (event) => {
    //     if (event.dropzone) {
    //       const newPart = parseInt(event.dropzone._element.dataset.partNum)
    //       if (typeof newPart === 'number' && newPart !== this.props.task.matrixPart) {
    //         this.props.onChangePart({
    //           id: this.props.task.id,
    //           oldPart: this.props.task.matrixPart,
    //           newPart: newPart
    //         })
    //         return
    //       }
    //     }
    //     this.props.dragHandlers.resetPosition(event.target)
    //   }
    // })
    interactjs(this.taskRef).draggable({
      onmove: interact.onDrag,
      onend: (event: any) => {
        if (event.dropzone) {
          const newPart = parseInt(event.dropzone.target.dataset.partNum)
          if (typeof newPart === 'number' && newPart !== this.props.task.matrixPart) {
            this.props.onChangeTaskPart({
              id: this.props.task.id,
              oldPart: this.props.task.matrixPart,
              newPart: newPart
            })
            return
          }
        }
        interact.resetPosition(event.target)
      }
    })
   }

  onTitleChange = (event) => {
    let task = this.props.task
    task.title = event.title
    this.props.onEditTask(task)
  }

  onDeleteTask = () => {
    this.props.onDeleteTask()
  }

  onChangeProbRating = (rating) => {
    this.props.onSetRating('prob', rating)
  }

  onChangePriorRating = (rating) => {
    this.props.onSetRating('prior', rating)
  }

  getPriorRatingLabel () {
    const { matrixPart } = this.props.task
    if (matrixPart === MatrixPartEnum.THREATS) return 'Степень'
    else if (matrixPart === MatrixPartEnum.OPPORTUNITIES) return 'Значимость' 
    else return ''
  }
}

const rules = ({ task, isDragging, ...props }: tProps) => ({
  padding: '1ex 2ex 1ex 2ex',
  position: 'relative',
  // transform: 'translate(' + props.x + 'px, ' + props.y + 'px)',
  zIndex: '30',

  '& .draggable': {
    position: 'fixed',
    width: '25vw',
    opacity: '.8'
  },

  '& .task__rating-stars': {
    display: 'span'
  },

  '& .task__rating-text': {
    fontSize: '13px'
  }
})

export default fela.context(Task)