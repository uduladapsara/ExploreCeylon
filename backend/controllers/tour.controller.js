import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  const tour = await Tour.create(req.body);
  res.json(tour);
};

export const getTours = async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
};

export const getTourById = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.json(tour);
};