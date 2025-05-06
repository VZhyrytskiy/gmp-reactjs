import { useSearchParams } from "react-router-dom";

function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const FD =  new FormData(event.currentTarget);
    const data = Object.fromEntries(FD.entries());
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', data.searchQuery as string);
    setSearchParams(newParams);
  }
  
  return (
    <>
      <h1 className="bg-dark-gray text-white uppercase text-5xl p-8">find your movie</h1>
      <form onSubmit={onSubmit} className="bg-dark-gray flex gap-4 p-8 justify-left" >
          <input 
              id="searchQuery"
              name="searchQuery"
              type="search" 
              defaultValue={searchQuery} 
              placeholder="What do you want to watch?"
              className="min-w-[600px] bg-gray text-white p-2 rounded" />
          <button test-id="search-btn" type="submit" className="text-lg cursor-pointer w-[182px] bg-red-accent p-2 rounded uppercase">Search</button>
      </form>
    </>
  )
}

export default SearchForm;