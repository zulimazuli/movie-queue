import React from 'react';
import MovieQueueItem from './MovieQueueItem/MovieQueueItem';

interface Movie {
    id: string,
    created: any,
    url: string,
    processed?: boolean
}

const MovieQueue = (props : any) => {
  
    const sortedMovies: Array<Movie> = props.movies
        .filter((element: Movie) => !element.processed)
        .sort((a: Movie, b: Movie) => b.created - a.created);
        
    return (
        <div className="MovieQueue">
            <ul className="List">
                {sortedMovies.map((e: Movie, i: number) =>
                    <MovieQueueItem key={i} id={e.id} created={e.created} url={e.url} delete={props.deleted} />
                )}
            </ul>
        </div>
    );
 }

export default MovieQueue;