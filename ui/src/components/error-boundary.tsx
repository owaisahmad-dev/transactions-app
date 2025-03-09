import * as React from 'react';

interface ErrorBoundaryProps {
  fallback: React.ComponentType<{ error: Error }>;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return <Fallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
