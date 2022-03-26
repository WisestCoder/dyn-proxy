import React, { FC, useCallback, useState } from 'react'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'

interface IProps extends ButtonProps {
  onClick: (p?: any) => void | Promise<any>
}

const AsyncButton: FC<IProps> = ({ children, onClick, ...otherProps }) => {
  const [loading, setLoading] = useState(false)

  const onButtonClick = useCallback(
    (...args) => {
      const promise = onClick(...args)

      if (promise && promise.finally) {
        setLoading(true)
        return promise.finally(() => {
          setLoading(false)
        })
      }
    },
    [onClick],
  )

  return (
    <Button {...otherProps} loading={loading} onClick={onButtonClick}>
      {children}
    </Button>
  )
}

export default AsyncButton
