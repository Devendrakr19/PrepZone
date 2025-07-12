import { toast } from "react-toastify";
export const handleSuccess = (success, successMessage) => {
  const successRes = success;
  const status = !!successRes && successRes.status; 

  const successMsg = !!successRes && !!successRes.data && successMessage;

  status === 200 && toast.success(successMsg, {
    position: toast.POSITION.TOP_RIGHT,
  }, { theme: "blue" }, { toastId: successMsg });
};
