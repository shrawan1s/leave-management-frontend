export const UI_TEXT = {
  API: {
    FALLBACK_ERROR: "Something went wrong",
  },
  AUTH: {
    BACK: "Back",
    CONFIRM_PASSWORD: "Confirm password",
    CONTINUE: "Continue",
    CREATE_ACCOUNT: "Create account",
    DEPARTMENT: "Department",
    EMAIL: "Email",
    HIDE_PASSWORD: "Hide password",
    JOIN_DATE: "Join date",
    LOGIN_FOOTER_LABEL: "Create one",
    LOGIN_FOOTER_TEXT: "Need an employee account?",
    LOGIN_TITLE: "Sign in",
    LOGOUT: "Logout",
    LOGOUT_SUCCESS: "Logged out successfully",
    NAME: "Name",
    PASSWORD: "Password",
    REGISTER_FOOTER_LABEL: "Sign in",
    REGISTER_FOOTER_TEXT: "Already registered?",
    REGISTER_TITLE: "Employee registration",
    SHOW_PASSWORD: "Show password",
    SIGN_IN: "Sign in",
  },
  PLACEHOLDER: {
    CONFIRM_PASSWORD: "Re-enter your password",
    DEPARTMENT: "Engineering",
    EMAIL: "name@company.com",
    JOIN_DATE: "Select join date",
    NAME: "Enter your full name",
    PASSWORD: "Enter your password",
  },
  META: {
    DESCRIPTION: "Employee and admin leave management system",
    TITLE: "Leave Management",
  },
  PLACEHOLDERS: {
    ADMIN_DASHBOARD_BODY:
      "Organization leave stats will be connected after the leave API step.",
    ADMIN_DASHBOARD_TITLE: "Admin dashboard",
    ADMIN_REQUESTS_BODY:
      "Approval workflows will be connected after the leave API step.",
    ADMIN_REQUESTS_TITLE: "All requests",
    APPLY_BODY:
      "The leave application form will be connected after the leave API step.",
    APPLY_TITLE: "Apply leave",
    EMPLOYEE_DASHBOARD_BODY:
      "Leave balance and recent requests will be connected in the leave step.",
    EMPLOYEE_DASHBOARD_TITLE: "Employee dashboard",
    MY_LEAVES_BODY:
      "Your leave history will be connected after the leave API step.",
    MY_LEAVES_TITLE: "My leaves",
  },
  THEME: {
    LABEL: "Toggle theme",
  },
  VALIDATION: {
    CONFIRM_PASSWORD_MATCH: "Passwords must match",
    DEPARTMENT_MIN: "Department must be at least 2 characters",
    EMAIL_REQUIRED: "Email is required",
    JOIN_DATE_REQUIRED: "Join date is required",
    NAME_MIN: "Name must be at least 2 characters",
    PASSWORD_MIN: "Password must be at least 6 characters",
  },
} as const;
