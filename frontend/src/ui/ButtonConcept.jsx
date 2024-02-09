const ButtonConcept = (props) => {
    const { children, className, color, ...otherProps  } = props;
  
    console.log(color);
    const defaultStyles = `bg-${color}-400 hover:bg-${color}-600 text-white font-bold py-2 px-4 rounded-lg neon-${color}`;
  
    return (
      <button className={`${defaultStyles} ${className}`} {...otherProps}>
        {children}
      </button>
    );
  }
  export default ButtonConcept