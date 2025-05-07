import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { enqueueSnackbar } = useSnackbar();

  const toggleNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification.message !== "")
      enqueueSnackbar(notification.message, {
        variant: notification.type,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
  }, [notification]);
  return { toggleNotification };
};
