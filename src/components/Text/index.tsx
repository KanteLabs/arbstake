type Props = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  onClick?: () => void;
  textAlign?: string;
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title?: string;
};

const FONT_FAMILY = "Comfortaa, ui-monospace, monospace";

const Text = ({
  children,
  className,
  onClick,
  tag: Tag = "span",
  title,
  ...rest
}: Props) => {
  const style = {
    ...rest,
    fontFamily: FONT_FAMILY,
  } as React.CSSProperties;

  return (
    <Tag className={className} onClick={onClick} title={title} style={style}>
      {children}
    </Tag>
  );
};

export default Text;
