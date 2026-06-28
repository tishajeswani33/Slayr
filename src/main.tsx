import { Component, ErrorInfo, ReactNode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Slayr Crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          backgroundColor: "#000000",
          color: "#ff5c5c",
          padding: "40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box"
        }}>
          <div style={{
            maxWidth: "600px",
            backgroundColor: "#0d0d0d",
            border: "1px solid #222222",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
          }}>
            <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "300", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "16px" }}>⚠️ SLAYR CRASH REPORT</h1>
            <p style={{ color: "#777777", fontSize: "14px", fontWeight: "300", lineHeight: "1.6", marginBottom: "24px" }}>
              A runtime script exception occurred in the web runtime container. Please copy the logs below to report the debug stack:
            </p>
            <pre style={{
              backgroundColor: "#050505",
              border: "1px solid #1a1a1a",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "left",
              overflowX: "auto",
              color: "#ff6b6b",
              fontSize: "12px",
              fontFamily: "Consolas, Monaco, monospace",
              lineHeight: "1.5",
              margin: "0"
            }}>
              {this.state.error?.stack || this.state.error?.toString()}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
