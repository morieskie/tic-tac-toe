import { ReactNode } from "react";
type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type AlertProps = { children: ReactNode; type?: AlertType };

const AlertComponent = ({ children, type = "info" }: AlertProps) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
};

export default AlertComponent;
