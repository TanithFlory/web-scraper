import { useState } from "react";
import { toast } from "react-toastify";

interface IStatus {
  message: string;
  success: boolean;
  data?: Record<string, any>;
}
interface ISubmitForm {
  formData: Record<string, string | number>;
  method: "POST" | "PUT" | "DELETE" | "GET";
  e: React.FormEvent;
  apiRoute: string;
  headers?: Record<string, string>;
}
export default function useSubmitForm() {
  const initialStatus: IStatus = {
    message: "",
    data: {},
    success: false,
  };
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async ({
    e,
    formData,
    method,
    apiRoute,
    headers,
  }: ISubmitForm) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Please wait...");

    try {
      const response = await fetch(apiRoute, {
        method,
        body: JSON.stringify(formData),
        headers,
      });
      const json = await response.json();
      if (!response.ok) {
        setStatus({
          message: json.message,
          success: false,
        });
        throw Error;
      }
      toast.update(toastId, {
        render: "Successful",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setStatus({
        message: json.message,
        data: json.data,
        success: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: status.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    submitFormHandler,
  };
}
