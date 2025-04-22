import { useState } from 'react';
import './App.css'
import Dialog from './components/Dialog/Dialog';
import { FocusTrap } from 'focus-trap-react';
import MovieListPage from './pages/MovieListPage/MovieListPage';

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
  // const [isOpen, setIsOpen] = useState(false);

  // const openDialog = () => {
  //   setIsOpen(true);
  //   console.log('openDialog called', isOpen);
  // }
  // const closeDialog = () => setIsOpen(false);


  return (
    <>

      {/* For Future implementation */}
      {/* <div>
        <button className="cursor-pointer" onClick={openDialog}>Open Dialog</button>

        {isOpen && (
            <Dialog title="delete movie" onClose={closeDialog}> */}
              {/* <div>
                <p>Are you sure you want to delete this movie?</p>
                <div className='flex flex-row justify-end mt-8'>
                  <button className='uppercase bg-red-accent text-white p-2 rounded w-[180px] cursor-pointer'>confirm</button>

                </div>
              </div> */}
              {/* <MovieForm initialValues={initialMovie} onSubmit={(movie) => { console.log('Submitted movie:', movie); closeDialog()}} />
            </Dialog>
        )}
      </div> */}

      <MovieListPage />

    </>
  )
}

export default App
