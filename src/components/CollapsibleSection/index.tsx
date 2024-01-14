import { useCallback, useState } from "react";
import Text from "../Text";
import styles from "@/styles/CollapsibleSection.module.scss";

type Props = {
  children?: React.ReactNode;
  label?: string;
};
const CollapsibleSection = ({ children, label }: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div className={styles.collapsible}>
      <div className="flex flex-col">
        <Text onClick={handleClick}>
          {label}
          <Text className={styles.arrow} tag="span">
            <div>{">"}</div>
          </Text>
        </Text>
        <div className={`${active ? styles.active : ""} ${styles.content}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
