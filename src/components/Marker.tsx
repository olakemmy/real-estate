const Marker = ({ size = 24, color = "#3182CE" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${size} w-${size}`}
      viewBox="0 0 20 20"
      fill={color}
    >
      <path
        fillRule="evenodd"
        d="M17.5 9c0-3.589-2.911-6.5-6.5-6.5S4.5 5.411 4.5 9c0 2.316 1.206 4.365 3 5.5V19l2-2 2 2v-4.5c1.794-1.135 3-3.184 3-5.5zm-6.5 5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Marker;
