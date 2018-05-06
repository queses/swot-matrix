import React, { Component } from 'react';
import Tasks from '../containers/TasksContainer'
import Matrix from '../containers/MatrixContainer'

export default class Main extends Component<any, any> {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-3"><Tasks/></div>
        <div className="pure-u-2-3"><Matrix/></div>
      </div>
  )}
}

