import React, { FC, CSSProperties } from 'react'
import cn from 'classnames'
import styles from './index.less'

export type TitleProps = {
  sign?: boolean
  style?: CSSProperties
  className?: string
}

const Title: FC<TitleProps> = ({ children, style = {}, className = '', sign = false }) => {
  return (
    <span style={style} className={cn(styles.container, { [styles.sign]: sign }, className)}>
      {children}
    </span>
  )
}

export default Title
