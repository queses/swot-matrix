import React from 'react';
import { fela } from '../../scripts/utils'

import 'assets/css/default.css'

export default fela.context(
  (pr: any, ctx: any) => {
    const className: string = ctx.renderer.renderRule(styles)
    return (
      <div className={`${ className } row`}>
        <div className="page-wrapper">
          {pr.children}
        </div>
      </div>
  )}
)

const styles = () => ({
  '& .page-wrapper': {
    marginTop: '0ex',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
