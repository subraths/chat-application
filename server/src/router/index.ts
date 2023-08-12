import { Router } from "express";
import { getInitialData } from "../controller/messages";
import { isAuthenticated } from "../middleware";
import { signIn, signUp } from "../controller/auth";
import { getUser, searchUser } from "../controller/search-user";

const router = Router();

router.route("/").get(isAuthenticated, getInitialData);
router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/search-user").post(searchUser);
router.route("/get-user").post(getUser);

export default router;
