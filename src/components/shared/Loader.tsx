interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader = ({ className = '', size = 24 }: LoaderProps) => {
  return (
    <div className={className}>
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
