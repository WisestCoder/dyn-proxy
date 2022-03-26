import React, { Component } from 'react'
import { Button } from 'antd'

type IState = {
  hasError: boolean
}

class ErrorBoundary extends Component<any, IState> {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error, errorInfo)
  }

  retry = () => {
    window.location.reload()
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <Button onClick={this.retry}>Retry</Button>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
