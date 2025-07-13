import express from 'express';
import {createGroup} from '../controllers/group.controller.js';
import {sendGroupMessage} from '../controllers/message.controller.js';

const router = express.Router();

import {protectRoute} from '../middlewares/auth.middleware.js';
router.post('/groups', protectRoute, createGroup);
router.post('/groups/:groupId/messages', protectRoute, sendGroupMessage);

export default router;
