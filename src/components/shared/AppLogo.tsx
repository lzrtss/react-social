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
      <span className={`text-xl ${className}`}>React Social</span>
    </div>
  );
};

export default AppLogo;
