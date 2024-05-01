import React from "react";

// import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  type="button",
  className,
  ...restProps
} ) => {
  // const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type={type}
      // onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
      {...restProps}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
