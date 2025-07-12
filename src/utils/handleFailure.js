import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleFailure = (err, displayMsg = "") => {
  if (!err.response) {
    // Network error or other error without a response
    toast.error(displayMsg || "An unexpected error occurred.");
    console.error("Network error:", err);
    return;
  }

  const errorRes = err.response;
  const status = errorRes.status;
  const data = errorRes.data;

  switch (status) {
    case 400:
      if (Array.isArray(data.error)) {
        // console.log(data.error, "eeeeeeeee")
        data.error.forEach((error) => toast.error(error));
      } else {
        toast.error(data.error || "Bad Request");
      }
      break;
    case 401:
      if (Array.isArray(data.error)) {
        data.error.forEach((error) => toast.error(error));
      } else {
        toast.error(data.detail || "Unauthorized");
      }
      break;
    case 404:
      toast.error(data.error || data.message || "Not Found");
      break;
    case 500:
      toast.error(data.error || data.message || "Not Found");
      break;
    default:
      toast.error(displayMsg || "An unexpected error occurred.");
      break;
  }

  console.error("Error response:", errorRes);
};
