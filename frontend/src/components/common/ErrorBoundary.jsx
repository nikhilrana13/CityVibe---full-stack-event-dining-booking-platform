import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f051d] text-white px-6">
          <div className="text-center max-w-lg">
            <h1 className="text-5xl font-bold mb-6">
              Something went wrong 😢
            </h1>

            <p className="text-gray-300 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            <button
              onClick={this.handleReload}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] hover:scale-105 transition-all"
            >
              Reload Page
            </button>

            {process.env.NODE_ENV === "development" && (
              <pre className="mt-6 text-left text-xs text-red-400 overflow-auto">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;