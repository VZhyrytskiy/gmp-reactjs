import { useState } from 'react';
import './App.css'
import Counter from './components/Counter/Counter';
import GenreSelect from './components/GenreSelect/GenreSelect';
import SearchForm from './components/SearchForm/SearchForm'

const genre = ['all', 'documentary', 'comedy', 'horror', 'crime'];

function App() {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const onSearch = (searchQuery: string) => {
    console.log(searchQuery)
  };

  const onSelect = (genre: string) => {
    console.log(genre);
    setSelectedGenre(genre);
  };

  return (
    <>
      <Counter />
      <SearchForm searchQuery='' onSearch={onSearch}/>
      <GenreSelect genre={genre} selectedGenre={selectedGenre} onSelect={onSelect}/>
    </>
  )
}

export default App
