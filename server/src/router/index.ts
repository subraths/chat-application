import { Router } from "express";
import { getInitialData } from "../controller/messages";
import { isAuthenticated } from "../middleware";
import { signIn, signUp } from "../controller/auth";

const router = Router();

router.route("/").get(isAuthenticated, getInitialData);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);

export default router;
