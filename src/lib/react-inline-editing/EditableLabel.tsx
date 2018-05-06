import React from 'react'
import EditableLabelOriginal from 'react-inline-editing'

export default class EditableLabel extends React.Component<any, any> {
  ref: JSX.Element = null

  constructor (props) {
    super(props)
    
    this.state = { isEditing: false }
  }

  render () {
    const getRef = (node) => this.ref = node

    return (
      <span onKeyDown={this.onKeyPress} tabIndex={0}>
        <EditableLabelOriginal ref={getRef} isEditing={this.state.isEditing} {...this.props} />
      </span>
  )}

  onKeyPress = (event) => {
    console.log(event.key)
    this.setState({ isEditing: false })
  }
}
