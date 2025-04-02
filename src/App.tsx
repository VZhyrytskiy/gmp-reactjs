import { useState } from 'react';
import './App.css'
import GenreSelect from './components/GenreSelect/GenreSelect';
import SearchForm from './components/SearchForm/SearchForm'
import MovieTile, { Movie } from './components/MovieTile/MovieTile';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { SortControl } from './components/SortControl/SortControl';
import Dialog from './components/Dialog/Dialog';
import { FocusTrap } from 'focus-trap-react';
import MovieForm from './components/MovieForm/MovieForm';
import { genres } from './constants/constants';


const movie: Movie = {
  "id": 337167,
  "title": "Fifty Shades Freed",
  "release_date": "2018-02-07",
  "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
  "genres": [
    "Drama",
    "Romance"
  ],
  "vote_average": 8.9,
  "overview": "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
  "runtime": 106
}

const initialMovie = {
  id: 1,
  title: "The Social Dilemma",
  release_date: "2020-01-26",
  poster_path: "https://image.tmdb.org/t/p/w500/7KmAL8Lz6d9M6XzOQh0rFNOa3lT.jpg",
  genres: ["documentary"],
  vote_average: 7.5,
  overview: "Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.",
  runtime: 94, // 1h 34min
};

function App() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('RELEASE DATE');
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    console.log('openDialog called', isOpen);
  }
  const closeDialog = () => setIsOpen(false);

  const onSearch = (searchQuery: string) => {
    console.log(searchQuery)
  };

  const onSelect = (genre: string) => {
    console.log(genre);
    setSelectedGenre(genre);
  };

  const callback = () => {
    console.log('Movie clicked');
  };

  const onOrder = (order: string) => {
    setSortBy(order);
    console.log(order);
  };

  console.log('App renders', isOpen);
  return (
    <>
      {/* <SearchForm searchQuery='' onSearch={onSearch}/> */}
      {/* <div className='flex flex-row justify-between'>
        <GenreSelect genre={genres} selectedGenre={selectedGenre} onSelect={onSelect}/>
        <SortControl currentSelection={sortBy} onSelectionChange={onOrder}/>
      </div>  */}
      {/* <MovieTile movie={movie} callback={callback}/> */}
      {/* <MovieDetails movie={movie} /> */}

      <div>
        <button className="cursor-pointer" onClick={openDialog}>Open Dialog</button>

        {isOpen && (
            <Dialog title="delete movie" onClose={closeDialog}>
              {/* <div>
                <p>Are you sure you want to delete this movie?</p>
                <div className='flex flex-row justify-end mt-8'>
                  <button className='uppercase bg-red-accent text-white p-2 rounded w-[180px] cursor-pointer'>confirm</button>

                </div>
              </div> */}
              <MovieForm initialValues={initialMovie} onSubmit={(movie) => { console.log('Submitted movie:', movie); closeDialog()}} />
            </Dialog>
        )}
      </div>

      {/* <MovieForm /> */}

    </>
  )
}

export default App
