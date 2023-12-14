import { Router } from "express"
import { Login, Register, getUsers } from "./controller"
import { authenticate } from "./middleware"

export const router: Router = Router()

router.post('/register', Register)
router.post('/login', Login)
router.get("/", authenticate, getUsers)