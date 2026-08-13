import { Component, ErrorInfo, ReactNode } from "react";
import ServerError from "@/pages/ServerError";
import { logActivity } from "@/lib/logger";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        logActivity({
            category: 'SYSTEM',
            level: 'ERROR',
            action: `Runtime Error Aplikasi: ${error.message || 'Terjadi kesalahan internal UI'}`,
            details: errorInfo?.componentStack || error?.stack || 'Komponen mengalami error saat dimuat',
        });
    }

    resetErrorBoundary = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ServerError
                    error={this.state.error ?? undefined}
                    resetErrorBoundary={this.resetErrorBoundary}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
