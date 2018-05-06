import React from 'react'
import { fela } from 'scripts/utils'
import MatrixPart from './MatrixPart'

import { iPartedTasks, tPartTaskCounter } from '../types/task'

export const PART_COLORS = ['#76C7D6', '#FECC68', '#98C31C', '#EF6962']
const PART_TITLES = [
  'Сильные стороны',
  'Слабые стороны',
  'Перспективы',
  'Угрозы'
]

interface iProps {
  tasks: iPartedTasks,
  partTaskCounter: tPartTaskCounter,
  badsCounter: number,
  goodsCounter: number,
  onChangeTaskPart: (any) => any,
  onDeleteTask: (any) => any,
}

class Matrix extends React.Component<iProps, any> {
  render () {
    const { tasks } = this.props
    const className = this.context.renderer.renderRule(rules)
    
    const summaryDiff = this.props.goodsCounter - this.props.badsCounter
    const summaryDiffStr = (summaryDiff < 0) ? String(summaryDiff) : "+" + String(summaryDiff)

    const PartMap = Object.keys(tasks).map((part: string) => {
      return (
        <MatrixPart
          tasks={tasks[part]}
          counter={this.props.partTaskCounter[part]}
          title={PART_TITLES[parseInt(part) - 1]}
          part={part}
          onChangeTaskPart={this.props.onChangeTaskPart}
          onDeleteTask={this.props.onDeleteTask}
          key={part}
        />
    )})

    return (
      <div className={className}>
        <div className="matrix-parts">
          {PartMap}
        </div>
        <div className="matrix-summary">
          <div className="matrix-summary__count">
            {this.props.goodsCounter} : {this.props.badsCounter}
          </div>
          <div className="matrix-summary__all">{summaryDiffStr}</div>
        </div>
      </div>
  )}
}


const rules = () => ({
  position: 'relative',

  '& .matrix-summary': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#9963ed',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontWeight: 600,
    fontSize: '18px',
    boxShadow: '0px 3px 9px 1px #00000044',
    zIndex: 50,

    '&__count': {
      fontSize: '12px'
    }
  },

  '& .matrix-parts': {
    minHeight: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  '& .matrix-part': {
    width: '50%',
    height: '50vh',
    margin: 0,
    overflow: 'auto',
    position: 'relative',

    '&.drop-above': {
      zIndex: '2',
      boxShadow: 'inset 0px 0px 20px 0px rgb(0, 123, 181)'
    }
  },


  '& .matrix-part_1': {
    backgroundColor: PART_COLORS[0]
  },

  '& .matrix-part_2': {
    backgroundColor: PART_COLORS[1]
  },

  '& .matrix-part_3': {
    backgroundColor: PART_COLORS[2]
  },

  '& .matrix-part_4': {
    backgroundColor: PART_COLORS[3]
  },

  '& .matrix-part__heading': {
    textAlign: 'center',
    margin: '1.5ex 0 1ex 0'
  },

  '& .matrix-part__counter': {
    marginLeft: '.5ex',
    color: '#2c2c2c',
    backgroundColor: 'white'
  }
})

export default fela.context(Matrix)