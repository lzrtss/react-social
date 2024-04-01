interface LoaderProps {
  size?: number;
}

const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={size}
        height={size}
      />
    </div>
  );
};

export default Loader;
