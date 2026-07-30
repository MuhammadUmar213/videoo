import { Component } from "react";

/**
 * Without this, any render-time exception unmounts the whole tree and leaves
 * the user on a blank white page with no way forward.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info?.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-600">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          This page failed to load
        </h1>
        <p className="mt-4 text-slate-600">
          The error has been logged. Reloading usually clears it — if it keeps
          happening, let us know from the contact page.
        </p>
        {/* Deliberately a plain anchor rather than a router Link: the render
            tree has already thrown, so a full document load is the reliable
            way out. A client-side transition would stay inside it. */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={this.handleReload} className="btn-primary">
            Reload page
          </button>
          <a href="/" className="btn-secondary">
            Back to home
          </a>
        </div>
      </div>
    );
  }
}
