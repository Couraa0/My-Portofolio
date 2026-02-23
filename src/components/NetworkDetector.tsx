import { useState, useEffect, ReactNode } from "react";
import NoConnection from "@/pages/NoConnection";

interface Props {
    children: ReactNode;
}

const NetworkDetector = ({ children }: Props) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOnline) {
        return <NoConnection />;
    }

    return <>{children}</>;
};

export default NetworkDetector;
