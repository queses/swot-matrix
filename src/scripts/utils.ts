// @flow
// import jssStyler from 'jss'
import propTypes from 'prop-types'
import { Component } from 'react'

// export let jss = {}
// jss.classes = (styles) => jssStyler.createStyleSheet(styles).attach().classes

export let jsx = {
  bind: (handlers: Array<string>, that: Component<any, any>) => {
    for (let handler of handlers) {
      that[handler] = that[handler].bind(that)
    }
  },
  call: (handler: Function, payload?: any) => (
    (event) => handler(event, payload)
  )
}

export let fela = {
  context: (component: any) => {
    if (component.contextTypes !== 'object') component.contextTypes = {}
    component.contextTypes.renderer = propTypes.object
    return component
  },
  renderComponent: (component: Component, rules: any) => {
    return component.context.renderer.renderRule(rules, component.props)
  }
}

export let interact = {
   onDrag: (event) => {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.classList.add('draggable');
  },
  resetPosition: (target) => {
    target.style.webkitTransform = target.style.transform = 'translate(0px, 0px)';
    target.removeAttribute('data-x');
    target.removeAttribute('data-y');
    target.classList.remove('draggable');
  }
}
