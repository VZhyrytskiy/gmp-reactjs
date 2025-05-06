import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './index.css';
import MovieListPage from './pages/MovieListPage/MovieListPage.tsx'
import SearchForm from './components/SearchForm/SearchForm.tsx';
import { MovieDetailsLoader } from './components/MovieDetailsLoader/MovieDetailsLoader.tsx';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route path="/" element={<SearchForm />} />
          <Route path=":movieId" element={<MovieDetailsLoader />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
