import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State { error: Error | null }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ padding: 24, color: '#f2f2f2', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 20 }}>Что-то пошло не так</h1>
        <p style={{ opacity: 0.7, marginTop: 8 }}>Сделайте скриншот этой страницы и пришлите разработчику.</p>
        <pre style={{ marginTop: 16, whiteSpace: 'pre-wrap', fontSize: 12, color: '#ff9b9b' }}>
          {this.state.error.message}
          {'\n'}
          {this.state.error.stack?.split('\n').slice(0, 6).join('\n')}
        </pre>
        <button onClick={() => { localStorage.clear(); location.hash = '#/'; location.reload() }} style={{ marginTop: 16, padding: '10px 16px', background: '#f2f2f2', color: '#0a0a0a', border: 0 }}>
          Сбросить данные и перезагрузить
        </button>
      </div>
    )
  }
}
