import React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    className={
      'w-full p-3 rounded-xl border-2 border-kidwise-blue focus:outline-none focus:ring-2 focus:ring-kidwise-blue/60 bg-white text-kidwise-text placeholder:text-kidwise-muted text-lg transition-shadow shadow-sm focus:shadow-lg ' +
      (props.className || '')
    }
    {...props}
  />
));
Input.displayName = 'Input';

export default Input;
