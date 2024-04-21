import { useState } from "react";

interface IStatus {
  message: string;
  type: "success" | "failure";
}

export default function useSubmitForm(
  formData: Record<string, string>,
  apiRoute: string,
  method: "POST" | "PUT" | "DELETE" | "GET"
) {
  const initialStatus: IStatus = {
    message: "",
    type: "failure",
  };
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  
  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(apiRoute, {
      method,
      body: JSON.stringify(formData),
    });

    setLoading(false);
    if (!response.ok) {
      return setStatus({
        message: (await response.text()) || "Failed",
        type: "failure",
      });
    }

    setStatus({
      message: "Successful",
      type: "success",
    });
  };

  return {
    status,
    loading,
    submitFormHandler,
  };
}
