const emailRegex = /^[\w-._]+@([\w-]{3,}\.)+[\w-]{2,4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\w\W]{6,}$/;

interface ValidationResult {
  isValidated: boolean;
  reason?: { message: string; status: number };
}

export default function validation(
  email: string,
  password: string
): ValidationResult {
  if (!email.trim().length || !password.trim().length) {
    return {
      isValidated: false,
      reason: {
        message: "Validation Error. Email & Password fields are required.",
        status: 400,
      },
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValidated: false,
      reason: { message: "Invalid Email, enter a valid email", status: 400 },
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValidated: false,
      reason: { message: "Password criteria failed.", status: 400 },
    };
  }

  return { isValidated: true };
}
