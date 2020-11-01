import React from 'react';
import { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';
import './Row.css';

const imgUrl = "https://image.tmdb.org/t/p/original/";
const movieTrailer = require( 'movie-trailer' )


function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch(error => console.log(error))
        }
    }
    return (
        <div className="row">
            <h2 className="row_title">{title}</h2>

            <div className="row_posters">
                {movies.map(movie => (
                    <img key={movie.id} 
                        onClick={() => handleClick(movie)} 
                        className={isLargeRow ?"row_poster originals": "row_poster"} 
                        src={`${imgUrl}${movie.poster_path}`} 
                        alt={movie.name} />
                ))};
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;
