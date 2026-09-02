import React from 'react';

interface Props {
  children: React.ReactNode;
  /** Sostituisce la schermata d'errore: utile per isolare un singolo widget. */
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;

      return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Oops!</h1>
            <p className="mb-6 text-lg text-muted">
              Something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-accent px-6 py-2.5 font-medium text-ink-deep transition-colors hover:bg-accent-bright"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
