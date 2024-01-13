type BlockProps = {
  children?: React.ReactNode;
  className?: string;
};

const style = {
  display: "block",
  margin: "0 0 1rem 0",
};

const Block = ({ children, ...props }: BlockProps) => {
  return (
    <div {...props} style={style}>
      {children}
    </div>
  );
};

export default Block;
