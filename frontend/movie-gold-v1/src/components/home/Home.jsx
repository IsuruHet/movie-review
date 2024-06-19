import PropTypes from "prop-types";
import Hero from "../hero/Hero";

const Home = ({ movies }) => {
  return (
    <div>
      <Hero movies={movies} />
    </div>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      trailerLink: PropTypes.string.isRequired,
      backdrops: PropTypes.arrayOf(PropTypes.string).isRequired,
      // Add other required properties here if needed
    })
  ).isRequired,
};

export default Home;
