import React from 'react'

export default (Component) => {
  return class Draggable extends React.Component<any, any> {
    constructor (props) {
      super(props)
      this.state = { x: 0, y: 0, isDragging: false }
    }

    render () {
      return <Component {...this.state} {...this.props} dragHandlers={this.handlers}/>
    }

    handlers = {
      onDrag: (event) => {
        let x = this.state.x + event.dx
        let y = this.state.y + event.dy
        this.setState({ x, y, isDragging: true })
      },
      resetPosition: (event) => {
        this.setState({ x: 0, y: 0, isDragging: false })
      }
    }
  }
}