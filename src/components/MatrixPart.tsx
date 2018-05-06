import React from 'react'
import Tasks from './Tasks'
import interactjs from 'interactjs'
import { fela } from 'scripts/utils'

import { iPartedTasks } from '../types/task'

type tProps = {
  tasks: iPartedTasks,
  part: number,
  title: String,
  counter: number,
  onChangeTaskPart: (any) => any,
  onDeleteTask: (any) => any,
}

class MatrixPart extends React.Component<tProps, any> {
  partRef: JSX.Element

  componentDidMount () {
    this.initInteractJs()
  }

  // shouldComponentUpdate(nextProps: tProps) {
  //   return !(JSON.stringify(this.props.tasks) === JSON.stringify(nextProps.tasks))
  // }

  render () {
    const { tasks, part, title, counter } = this.props
    // const className = this.context.renderer.renderRule(rules)
    const getPartRef = () => node => { this.partRef = node } 
    
    console.log('DEV PART: ', part)

    return (
      <div 
        ref={getPartRef()}
        data-part-num={part}
        className={`matrix-part matrix-part_${part}`}
        key={part}
      >
        <h4 className="matrix-part__heading">
        {title}
        {counter ? <p className="badge matrix-part__counter">{counter}</p> : ''}
        </h4>
        <Tasks tasks={tasks} isInner={true}/>
      </div>
  )}

  initInteractJs () {
    interactjs(this.partRef).dropzone({
      // only accept elements matching this CSS selector
      accept: '.card',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.50,
      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
      },
      ondropdeactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.remove('drop-active');
      },
      ondragenter: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-above')
      },
      ondragleave: function (event) {
        event.target.classList.remove('drop-above')
      },
      ondrop: function (event) {
        event.target.classList.remove('drop-above')
      }
    })
  }
}

// const rules = () => ({})

export default fela.context(MatrixPart)