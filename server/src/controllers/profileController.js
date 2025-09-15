import { z } from "zod";
import * as profileModel from "../models/profileModel.js";
import * as passengerModel from "../models/passengerModel.js";

// ------------------- Zod Schemas -------------------

// Profile schemas
const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
});

// Passenger schemas
const createPassengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  age: z.number().min(0, "Age must be valid"),
});

const updatePassengerSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  age: z.number().min(0).optional(),
});

const passengerIdSchema = z.object({
  passengerId: z.string().min(1, "passengerId is required"),
});

// ------------------- Profile Controllers -------------------

// GET /profile
export async function getProfile(req, res, next) {
  try {
    const profile = await profileModel.getProfile(req.userId.id);
    return res.success({ profile });
  } catch (err) {
    next(err);
  }
}

// PATCH /profile
export async function updateProfile(req, res, next) {
  try {
    const data = updateProfileSchema.parse(req.body);
    const updatedProfile = await profileModel.updateProfile(req.userId.id, data);
    return res.success({ profile: updatedProfile }, { message: "Profile updated successfully" });
  } catch (err) {
    next(err);
  }
}

// ------------------- Passenger Controllers -------------------

// GET /passengers
export async function listPassengers(req, res, next) {
  try {
    const passengers = await passengerModel.listPassengers(req.userId.id);
    return res.success({ passengers }, { count: passengers.length });
  } catch (err) {
    next(err);
  }
}

// POST /passengers
export async function addPassenger(req, res, next) {
  try {
    const data = createPassengerSchema.parse(req.body);
    const passenger = await passengerModel.addPassenger(req.userId.id, data);
    return res.success({ passenger }, { message: "Passenger added successfully" });
  } catch (err) {
    next(err);
  }
}

// PATCH /passengers/:passengerId
export async function updatePassenger(req, res, next) {
  try {
    const { passengerId } = passengerIdSchema.parse(req.params);
    const data = updatePassengerSchema.parse(req.body);
    const updatedPassenger = await passengerModel.updatePassenger(req.userId.id, passengerId, data);
    return res.success({ passenger: updatedPassenger }, { message: "Passenger updated successfully" });
  } catch (err) {
    next(err);
  }
}
// DELETE /passengers/:passengerId
export async function deletePassenger(req, res, next) {
  try {
    const { passengerId } = passengerIdSchema.parse(req.params);
    await passengerModel.deletePassenger(req.userId.id, passengerId);
    return res.success({}, { message: "Passenger deleted successfully" });
  } catch (err) {
    next(err);
  }
}
