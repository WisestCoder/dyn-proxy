import React from 'react'

interface IconClass {
  icon: string
}

const TyIcon = (props: IconClass) => {
  const { icon } = props
  return <i className={`iconfont ${icon}`} style={{ marginRight: '8px' }} />
}

export default TyIcon
