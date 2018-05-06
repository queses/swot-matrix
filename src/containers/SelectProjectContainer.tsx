import PageComponent from 'components/SelectProjectPage'
import { connect } from 'react-redux'
import { selectProject } from 'store/actions/project-actions'

import { tStoreState } from 'types/store';

const mapState = ({ project }: tStoreState) => ({
  projects: project.projects
})

const mapDispatch = (dispatch) => ({
  selectProject: (title) => dispatch(selectProject(title)),
})

export default connect(mapState, mapDispatch)(PageComponent)