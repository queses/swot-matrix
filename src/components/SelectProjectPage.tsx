import React from 'react'
import { fela } from '../scripts/utils'
import { tProject } from 'types/project';

type tProps = {
  selectProject: Function,
  projects: tProject[]
}

const SELECT_FIELD_FIRST_NO_PROJECT = "...или выберите проект"

class SelectProjectPage extends React.Component<tProps, any> {
  constructor (ps) {
    super(ps)
    this.state = {
      projectTitle: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onTitleChanged = this.onTitleChanged.bind(this)
    this.onProjectSelected = this.onProjectSelected.bind(this)
  }

  render () {
    const { state, props } = this

    const optionsMap = () => props.projects.map(title => (
      <option value={title} key={title}>{title}</option>
    ))

    return (
      <div className={fela.renderComponent(this, styles)}>
        <span className="select-project__container">
          <h1>SWOT.</h1>
          <form className="pure-form">
            <fieldset className="pure-group pure-u-1-2">
              <input
                placeholder="Введите название проекта"
                type="text"
                className="pure-input"
                value={state.projectTitle}
                onChange={this.onTitleChanged}
              />
            </fieldset>
            <fieldset className="pure-group pure-u-1-2">
              <select
                className={"pure-input pure-select" + (state.projectTitle ? "" : " pure-select-empty")}
                value={state.projectTitle}
                onChange={this.onProjectSelected}
              >
                <option className="red" value="">{SELECT_FIELD_FIRST_NO_PROJECT}</option>
                {optionsMap()}
              </select>
            </fieldset>
            <button className="pure-button pure-button-primary" onClick={this.onSubmit}>
              Продолжить
            </button>
          </form>
        </span>
      </div>
  )}

  onTitleChanged ({ target }) {
    this.setState({ projectTitle: target.value })
  }

  onProjectSelected ({ target }) {
    this.setState({ projectTitle: target.value })
  }

  onSubmit (event: React.SyntheticEvent<any>) {
    event.preventDefault()
    this.props.selectProject(this.state.projectTitle)
  }
}

const styles = (props: tProps) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10vh',

  '& h1': {
    fontWeight: 300,
    fontSize: '56px',
    marginBottom: '.5ex'
  },
  
  '& .select-project__container': {
    minWidth: '50%'
  },

  '& .pure-input': {
    width: '90%'
  },
  
  '& select.pure-select': {
    height: '42px',

    '&-empty': {
      color: 'grey',

      '& > option:not(:first-child)': {
        color: 'black'
      }
    }
  }
})

export default fela.context(SelectProjectPage)