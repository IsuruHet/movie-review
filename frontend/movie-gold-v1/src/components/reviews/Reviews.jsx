import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  useEffect(() => {
    getMovieData(movieId);
  }, [getMovieData, movieId]);

  //console.log(reviews);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      // Update state with the new review
      const updatedReviews = reviews
        ? [
            ...reviews,
            { reviewBody: rev.value, id: { date: new Date().getTime() } },
          ]
        : [{ reviewBody: rev.value, id: { date: new Date().getTime() } }];
      setReviews(updatedReviews);

      // Clear the form input after submission
      rev.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>

        <Col>
          <Row>
            <Col>
              <ReviewForm
                handleSubmit={addReview}
                revText={revText}
                labelText="Write a Review"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index}>
                <Row>
                  <Col>{review.reviewBody}</Col>
                </Row>
                <Row>
                  <Col>
                    <small>{new Date(review.id.date).toLocaleString()}</small>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            ))
          ) : (
            <div>No reviews yet.</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

Reviews.propTypes = {
  getMovieData: PropTypes.func.isRequired,
  movie: PropTypes.object,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewBody: PropTypes.string,
      id: PropTypes.shape({
        date: PropTypes.number,
      }),
    })
  ),
  setReviews: PropTypes.func.isRequired,
};

export default Reviews;
