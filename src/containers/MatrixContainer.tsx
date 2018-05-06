// import React, { Component } from 'react'
import { connect } from 'react-redux'
import MatrixComponent from 'components/Matrix'
import tState from 'types/store'
import { onlyParted } from 'store/selectors/task-selectors'

const mapState = ({ task }: tState) => ({
  tasks: onlyParted(task.tasks),
  partTaskCounter: task.partTaskCounter,
  goodsCounter: task.goodsCounter,
  badsCounter: task.badsCounter
})

const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(MatrixComponent)