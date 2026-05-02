import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const review = await Review.create({
    user: req.user._id,
    ...req.body
  });
  res.json(review);
};

export const getReviews = async (req, res) => {
  const reviews = await Review.find({ tour: req.params.tourId }).populate("user");
  res.json(reviews);
};