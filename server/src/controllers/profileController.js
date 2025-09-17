import { z } from "zod";
import * as profileModel from "../models/profileModel.js";
import * as passengerModel from "../models/passengerModel.js";

const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
});


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


export async function getProfile(req, res, next) {
  try {
    const profile = await profileModel.getProfile(req.userId.id);
    return res.success({ profile });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const data = updateProfileSchema.parse(req.body);
    const updatedProfile = await profileModel.updateProfile(req.userId.id, data);
    return res.success({ profile: updatedProfile }, { message: "Profile updated successfully" });
  } catch (err) {
    next(err);
  }
}


export async function listPassengers(req, res, next) {
  try {
    const passengers = await passengerModel.listPassengers(req.userId.id);
    return res.success({ passengers }, { count: passengers.length });
  } catch (err) {
    next(err);
  }
}

export async function addPassenger(req, res, next) {
  try {
    const data = createPassengerSchema.parse(req.body);
    const passenger = await passengerModel.addPassenger(req.userId.id, data);
    return res.success({ passenger }, { message: "Passenger added successfully" });
  } catch (err) {
    next(err);
  }
}

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
export async function deletePassenger(req, res, next) {
  try {
    const { passengerId } = passengerIdSchema.parse(req.params);
    await passengerModel.deletePassenger(req.userId.id, passengerId);
    return res.success({}, { message: "Passenger deleted successfully" });
  } catch (err) {
    next(err);
  }
}