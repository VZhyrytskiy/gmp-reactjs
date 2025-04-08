import './GenreSelect.css';

export interface GenreSelectProps {
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
        <section className="flex gap-8 bg-gray w-full text-white uppercase">
            {genre.map((genre) => {
                return (<a
                    className={`${isSelectedGenre(genre)} text-base font-medium cursor-pointer`}
                    key={genre} 
                    onClick={() => onSelectGenre(genre)}>{genre}
                </a>)
            })}
        </section>
  )
}

export default GenreSelect;