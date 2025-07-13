import {Group} from '../models/group.model.js';

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const creatorId = req.user._id;
    const memberIds = req.body.members || [];

    const newGroup = new Group({
      name,
      createdBy: creatorId,
      members: [memberIds, creatorId].filter(Boolean) // Ensure creator is included
    });

    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
