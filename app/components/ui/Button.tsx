import React from 'react';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    ref={ref}
    {...props}
    className={
      'w-full bg-kidwise-accent text-white rounded-xl p-3 font-bold hover:bg-kidwise-orange focus:bg-kidwise-orange transition text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-kidwise-yellow/60 active:scale-95 disabled:opacity-60 ' +
      (props.className || '')
    }
  >
    {props.children}
  </button>
));
Button.displayName = 'Button';

export default Button;
