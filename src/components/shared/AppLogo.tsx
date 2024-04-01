interface AppLogoProps {
  className?: string;
  height?: number;
  width?: number;
}

const AppLogo = ({ className, height = 24, width = 24 }: AppLogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/assets/icons/logo.svg"
        height={height}
        width={width}
        alt="logo"
      />{' '}
      <h1 className={`text-xl font-semibold ${className}`}>React Posts</h1>
    </div>
  );
};

export default AppLogo;
