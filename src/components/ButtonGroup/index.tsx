/**
 * Button组
 */

import React, { FC, useCallback, CSSProperties } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import cn from 'classnames'
import AsyncButton from '@/components/AsyncButton'

interface BProps extends ButtonProps {
  component?: React.ReactElement
  isAsync?: boolean
}
interface IProps {
  align?: 'left' | 'right' | 'center'
  buttons?: BProps[]
  style?: CSSProperties
  className?: string
  space?: number
  isAsync?: boolean
}

const ButtonGroup: FC<IProps> = ({
  align = 'left',
  style = {},
  className,
  buttons = [],
  space = 20,
  isAsync = false,
}) => {
  const renderCpt = useCallback(
    (item) => {
      const { children, component, isAsync: itemIsAsync, ...otherProps } = item
      if (component) {
        return component
      }

      if (isAsync || itemIsAsync) {
        return <AsyncButton {...otherProps}>{children}</AsyncButton>
      }

      return <Button {...otherProps}>{children}</Button>
    },
    [isAsync],
  )

  return (
    <div className={cn({ [className]: !!className })} style={{ textAlign: align, ...style }}>
      {buttons.map((item, index) => (
        <span key={index} style={{ marginLeft: index === 0 ? 0 : `${space}px` }}>
          {renderCpt(item)}
        </span>
      ))}
    </div>
  )
}

export default ButtonGroup
