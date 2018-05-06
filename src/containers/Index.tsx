import React from 'react';
import { connect } from 'react-redux'
import MatrixPage from '../components/MatrixPage'
import SelectProjectPage from './SelectProjectContainer'
import DefaultLayout from '../components/layouts/default'
import WelcomeLayout from '../components/layouts/welcome'

const mapState = ({ project }) => ({
  selectedProject: project.selectedProject 
})

const Index = ({ selectedProject }) => {
  if (selectedProject) return <DefaultLayout><MatrixPage/></DefaultLayout>
  else return <WelcomeLayout><SelectProjectPage/></WelcomeLayout>
}

export default connect(mapState)(Index)

