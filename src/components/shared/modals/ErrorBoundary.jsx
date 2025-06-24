import { div } from "prelude-ls";
import React from "react";
import { Background } from "../Background/index.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("error capturado por ErrotBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <main className="relative min-h-screen overflow-hidden bg.transparente"> 
          <div className=" relative z-10 h-screen flex flex-col justify-center items-center bg-red-600 text-white p-6">
            <h1 className="text-4xl font-bold mb-4">Algo salió mal.</h1>
            <p>Intenta recargar la página o vuelve más tarde.</p>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
