import './GenreSelect.css';

interface GenreSelectProps {
    genre: string[];
    selectedGenre: string;
    onSelect: (genre: string) => void; 
}

function GenreSelect(props: GenreSelectProps) {
    const { genre, selectedGenre, onSelect } = props;

    const onSelectGenre = (genre: string) => {
        onSelect(genre);
    }

    const isSelectedGenre = (genre: string) => {
        return selectedGenre === genre ? 'selected' : '';
    };

    return (
        <section className="genre-select-container">
            {genre.map((genre) => {
                return (<a
                    className={`genre-item ${isSelectedGenre(genre)}`}
                    key={genre} 
                    onClick={() => onSelectGenre(genre)}>{genre}
                </a>)
            })}
        </section>
  )
}

export default GenreSelect;