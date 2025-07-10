import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (  
    <div className="w-full">
      {label && 
        <label className="inline-block mb-1 pl-1 font-semibold" htmlFor={id}>
          {label}
        </label>
        }

      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={`px-3 py-2 rounded-lg bg-gray-300 text-black 
        outline-none focus:bg-grey-50 ease-in-out transition-all duration-600 border-gray-100 border-4
        hover:border-blue-800 w-full  ${className}`}
      />
    </div>
  );
});

export default Input;
