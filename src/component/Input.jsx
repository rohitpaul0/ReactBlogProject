import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (  
    <div className="w-full">
      {label && 
        <label className="inline-block mb-1 pl-1 text-white" htmlFor={id}>
          {label}
        </label>
        }

      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black 
        outline-none focus:bg-grey-50 duration-150 border
        border-gay-200 w-full  ${className}`}
      />
    </div>
  );
});

export default Input;
