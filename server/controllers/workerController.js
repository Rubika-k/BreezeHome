import mongoose from 'mongoose';
import Worker from '../models/worker.js';

// ✅ Public: Get workers by category (for Customers)

export const getWorkersByCategory = async (req, res) => {
  try {
    const { category } = req.query;
const workers = await Worker.find({ category: new mongoose.Types.ObjectId(category) }).select('-password');

    res.status(200).json(workers);
  } catch (error) {
    console.error('Error in getWorkersByCategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Admin: Get all workers (no filter)
export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().select('-password');
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workers', error });
  }
};

// ✅ Admin: Get single worker by ID
export const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).select('-password');
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching worker', error });
  }
};

// ✅ Admin: Create new worker
export const createWorker = async (req, res) => {
  try {
    const {
      fullName, email, phone, profilePicture, address, experience,
      category, isVerified, registrationFeePaid, isAvailable, nextAvailableTime
    } = req.body;

    const newWorker = new Worker({
      fullName,
      email,
      phone,
      profilePicture,
      address,
      experience,
      category,
      isVerified,
      registrationFeePaid,
      isAvailable,
      nextAvailableTime
    });

    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ error: err.message, errors: err.errors });
  }
};


// export const updateWorker = async (req, res) => {
//   const worker = await Worker.findById(req.params.id);
//   worker.isAvailable = req.body.isAvailable;
//   worker.nextAvailableTime = req.body.nextAvailableTime;
//   await worker.save();
// };

export const updateWorker = async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    return res.json(updated);
  } catch (err) {
    console.error("⚠️ [updateWorker] error:", err);
    console.error("Payload:", req.body);
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Delete worker
export const deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json({ message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting worker', error });
  }
};
