const ColorPickIcon = ({ color, targetColor, setColor }) => {
  const colorIconClick = (e) => {
    setColor(e);
  };

  return (
    <svg
      onClick={() => colorIconClick(targetColor)}
      xmlns="http://www.w3.org/2000/svg"
      className={
        color === targetColor
          ? "icon icon-tabler icon-tabler-circle-filled  bg-gray-300 rounded-full p-0.5"
          : "icon icon-tabler icon-tabler-circle-filled"
      }
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth="1.75"
      stroke="currentColor"
      fill="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
        strokeWidth={0}
        fill={targetColor ? targetColor : "currentColor"}
      ></path>
    </svg>
  );
};

export default ColorPickIcon;
