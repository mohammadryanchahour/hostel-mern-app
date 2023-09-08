import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";

export const createHostel = async (req, res, next) => {
  const newHostel = new Hostel(req.body);

  try {
    const savedHostel = await newHostel.save();
    res.status(200).json(savedHostel);
  } catch (err) {
    next(err);
  }
};
export const updateHostel = async (req, res, next) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHostel);
  } catch (err) {
    next(err);
  }
};
export const deleteHostel = async (req, res, next) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hostel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    res.status(200).json(hostel);
  } catch (err) {
    next(err);
  }
};
export const getHostels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hostels = await Hostel.find({
      ...others,
      cheapestPrice: { $gt: min | 1000, $lt: max || 5000 },
    }).limit(req.query.limit);
    res.status(200).json(hostels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hostel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const boysCount = await Hostel.countDocuments({ type: "Boys" });
    const girlsCount = await Hostel.countDocuments({ type: "Girls" });

    res.status(200).json([
      { type: "Boys", count: boysCount },
      { type: "Girls", count: girlsCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHostelRooms = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    const list = await Promise.all(
      hostel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
