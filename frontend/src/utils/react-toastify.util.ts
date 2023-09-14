import { toast } from "react-toastify";

const toastList = new Set();
const MAX_TOAST = 5;

export function toastNotification(message, variant: 'success' | 'error') {
  if (toastList.size < MAX_TOAST) {
    const id = toast[variant](message, {
      onClose: () => toastList.delete(id)
    });
    toastList.add(id);
  }
}