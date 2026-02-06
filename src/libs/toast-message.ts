import { toast } from "react-toastify";

interface ToastParams {
  message: string;
  type?: "error" | "warning" | "success" | "info";
}

export const toastMessage = ({ message, type = "success" }: ToastParams) => {
  toast[type](message, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "colored",
  });
};

export const errorToast = (message: string) => toastMessage({ message, type: "error" });
