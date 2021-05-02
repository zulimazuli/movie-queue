import { useCallback } from "react";
import { store } from "react-notifications-component";

const useNotification = () => {
    
    const add = (type: "success" | "danger" | "info" | "default" | "warning" | undefined, message: string) =>
        store.addNotification({
        // title: 'Error',
        message: message,
        type: type,
  
        container: "top-center",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true
        }
        });
    
    const context = {
        addSuccess: useCallback((message) => add("success", message), []),
        addError: useCallback((message) => add("danger", message), []),
        addInfo: useCallback((message) => add("info", message), [])
    }

    return context;
}

export default useNotification;