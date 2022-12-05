import express from 'express'
import { register,login,registerAdmin } from '../controllers/auth.js'

const router =express.Router();

// router.post("/register", register)
router.post("/login", login)

//admin route
router.post("/register/admin", registerAdmin)


export default router;