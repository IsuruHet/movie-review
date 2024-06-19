import PropTypes from "prop-types";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Hero = ({ movies }) => {
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies.map((movie, index) => (
          <Paper key={index}>
            <div className="movie-card-container">
              <div
                className="movie-card"
                style={{ "--img": `url(${movie.backdrops[0]})` }}
              >
                <div className="movie-detail">
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                  <div className="movie_title">
                    <h4>{movie.title}</h4>
                  </div>
                  <div className="movie-buttons-container">
                    <Link
                      to={`/Trailer/${movie.trailerLink.substring(
                        movie.trailerLink.length - 11
                      )}`}
                    >
                      <div className="play-button-icon-container">
                        <FontAwesomeIcon
                          className="play-button-icon"
                          icon={faCirclePlay}
                        />
                      </div>
                    </Link>

                    <div className="movie-review-button-container">
                      <Button
                        variant="info"
                        onClick={() => reviews(movie.imdbId)}
                      >
                        Reviews
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

Hero.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      trailerLink: PropTypes.string.isRequired,
      backdrops: PropTypes.arrayOf(PropTypes.string).isRequired,
      imdbId: PropTypes.string.isRequired,
      // Add other required properties here if needed
    })
  ).isRequired,
};

export default Hero;
