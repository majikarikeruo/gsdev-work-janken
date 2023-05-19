/**
 * Icons
 */
import { IconTallymark1 } from "@tabler/icons-react";

const LineIcon = ({ width, strokeWidth, setWidth }) => {
  const handleLineWidth = (e) => {
    setWidth(e);
  };

  return (
    <IconTallymark1
      onClick={() => handleLineWidth(strokeWidth)}
      stroke={strokeWidth}
      className={
        width === strokeWidth
          ? "inline-block rotate-90  bg-gray-300 rounded-full p-0.5"
          : "inline-block rotate-90"
      }
    />
  );
};

export default LineIcon;
