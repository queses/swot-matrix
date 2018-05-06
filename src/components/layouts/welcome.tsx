import React from 'react';

import 'purecss/build/pure.css'
import 'assets/css/default.css'
import { fela } from 'scripts/utils'
// import img from 'assets/img/sky-bg.jpeg'

export default fela.context(
  (ps: any, ctx: any) => {
    // ctx.renderer.renderStatic(bodyStyles, 'body')
    return (
    <div className={ctx.renderer.renderRule(styles , ps)}>
      <div className={'page-wrapper'}>
        {ps.children}
      </div>
    </div>
  )}
)

const styles = () => ({ })

// const bodyStyles = {
//   backgroundImage: `url(${img})`,
//   backgroundPosition: 'center'
// }
