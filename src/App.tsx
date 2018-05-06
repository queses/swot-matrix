import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as FelaProvider } from 'react-fela'
import { createRenderer } from 'fela'
// import utils from './scripts/utils'
import IndexContainer from './containers/Index'
import store from './store'
import * as projectActions from 'store/actions/project-actions'

import 'purecss/build/pure.css'
import 'font-awesome/css/font-awesome.min.css'

const renderer = createRenderer()

class App extends React.Component<any, any> {
  componentWillMount() {
    if (window) {
      const project: string = window.location.hash.substr(1)
      if (project) store.dispatch(projectActions.selectProject(project))
    }
  }

  render () {
    return (
      <ReduxProvider store={store}>
        <FelaProvider renderer={renderer}>
          <IndexContainer/>
        </FelaProvider>
      </ReduxProvider>
  )}
}

export default App