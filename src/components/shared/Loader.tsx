const Loader = ({ isOnBackground = false }: { isOnBackground?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        isOnBackground ? "invert-75" : ""
      }`}
    >
      <img
        src="/assets/icons/infinite-spinner.svg"
        alt="loader"
        width={24}
        height={24}
      />
    </div>
  );
};

export default Loader;
