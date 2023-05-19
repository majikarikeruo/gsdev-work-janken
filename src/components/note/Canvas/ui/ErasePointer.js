import { IconCircleFilled } from "@tabler/icons-react";

/**
 * Mantine
 */
import { ActionIcon } from "@mantine/core";

const ErasePointer = ({ eraseSize, eraseWidth, setEraseWidth }) => {
  const handleEraseWidth = (e) => {
    setEraseWidth(e);
  };

  return (
    <IconCircleFilled
      onClick={() => handleEraseWidth(eraseSize)}
      size={eraseSize}
      fill="white"
      className={
        eraseWidth === eraseSize
          ? "inline-block rotate-90  bg-gray-300 rounded-full p-0.5"
          : "inline-block rotate-90"
      }
    />
  );
};

export default ErasePointer;
