import React, { ReactNode } from "react";
import cx from "classnames";
import Navbar from "../Navbar";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  fluid = false,
  fullWidth = false,
}) => {
  return (
    <div
      className={cx(
        "w-full mx-auto transition-all",
        !fluid && !fullWidth && "max-w-[1440px]",
        !fluid && fullWidth && "max-w-[1920px]",
        !fullWidth && "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        className
      )}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Container;
