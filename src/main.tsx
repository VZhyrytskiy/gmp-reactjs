import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './index.css';
import MovieListPage from './pages/MovieListPage/MovieListPage.tsx'
import SearchForm from './components/SearchForm/SearchForm.tsx';
import { MovieDetailsLoader } from './components/MovieDetailsLoader/MovieDetailsLoader.tsx';
import AddMovieForm from './components/AddMovieForm/AddMovieForm.tsx';
import EditMovieForm from './components/EditMovieForm/EditMovieForm.tsx';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route path="/" element={<SearchForm />}>
            <Route path="new" element={<AddMovieForm />} />
            <Route path=":movieId/edit" element={<EditMovieForm />} />
          </Route>
          <Route path=":movieId" element={<MovieDetailsLoader />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
