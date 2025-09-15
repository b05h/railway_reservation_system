import SeatTypeModel from "../models/seatTypeModel.js";

export const createSeatType = async (req, res) => {
  try {
    const seatType = await SeatTypeModel.create(req.body);
    res.status(201).json(seatType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSeatTypes = async (req, res) => {
  try {
    const seatTypes = await SeatTypeModel.find(req.query, req.query);
    res.json(seatTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSeatType = async (req, res) => {
  try {
    const seatType = await SeatTypeModel.update(req.params.id, req.body);
    if (!seatType) {
      return res.status(404).json({ error: "Seat type not found" });
    }
    res.json(seatType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSeatType = async (req, res) => {
  try {
    const seatType = await SeatTypeModel.delete(req.params.id);
    if (!seatType) {
      return res.status(404).json({ error: "Seat type not found" });
    }
    res.json({ message: "Seat type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createSeatType,
  getSeatTypes,
  updateSeatType,
  deleteSeatType,
};
