import express from 'express'
import {getNotifications } from '../controllers/notifications.js'

const router =express.Router();


router.get("/:id", getNotifications)

export default router;