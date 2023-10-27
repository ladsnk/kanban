import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}

const Button = ({ className, children, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={"purple-button " + (className ? className : "")}
    >
      {children}
    </button>
  );
};

export { Button };
