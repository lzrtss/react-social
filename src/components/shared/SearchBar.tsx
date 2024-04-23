import { Input } from '@/components/ui';

interface SearchBarProps {
  containerClassName?: string;
  inputClassName?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  containerClassName = '',
  inputClassName = '',
  value,
  handleChange,
}: SearchBarProps) => {
  return (
    <div
      className={`w-full flex gap-1 px-4 rounded-lg bg-dark-4 ${containerClassName}`}
    >
      <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />

      <Input
        type="text"
        placeholder="Search"
        value={value}
        className={`h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 ${inputClassName}`}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
