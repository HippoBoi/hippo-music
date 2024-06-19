import "./SearchBar.css";

interface Props {
    onSearch: (search: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
    return (
        <input 
            placeholder='Search...' 
            className='search-bar'
            onChange={event => onSearch(event.target.value)} />
    );
}

export default SearchBar