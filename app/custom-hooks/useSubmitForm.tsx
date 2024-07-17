import { useState } from "react";

interface IStatus {
  message: string;
  success: boolean;
}
interface ISubmitForm {
  formData: Record<string, string | number>;
  method: "POST" | "PUT" | "DELETE" | "GET";
  e: React.FormEvent;
  apiRoute: string;
}
export default function useSubmitForm() {
  const initialStatus: IStatus = {
    message: "",
    success: false,
  };
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const submitFormHandler = async ({
    e,
    formData,
    method,
    apiRoute,
  }: ISubmitForm) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(apiRoute, {
        method,
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      setLoading(false);
      if (!response.ok) {
        return setStatus({
          message: json.message,
          success: false,
        });
      }

      setStatus({
        message: json.message,
        success: true,
      });
    } catch (error) {
      console.log("Something went wrong: ", (error as any).data.message);
    }
  };

  return {
    status,
    loading,
    submitFormHandler,
  };
}
