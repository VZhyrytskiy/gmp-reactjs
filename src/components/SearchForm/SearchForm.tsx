interface SearchFormProps {
    searchQuery: string;
    onSearch: (searchQuery: string) => void;
}

function SearchForm(props: SearchFormProps) {
  const { searchQuery, onSearch } = props;
  
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const FD =  new FormData(event.currentTarget);
    const data = Object.fromEntries(FD.entries());
    onSearch(data.searchQuery as string);
  }
  
  return (
    <form onSubmit={onSubmit}>
        <input 
            id="searchQuery"
            name="searchQuery"
            type="text" 
            defaultValue={searchQuery} 
            placeholder="What do you want to watch?" />
        <button test-id="search-btn" type="submit">Search</button>
    </form>
  )
}

export default SearchForm;