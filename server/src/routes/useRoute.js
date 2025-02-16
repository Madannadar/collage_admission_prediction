import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser} from "../controllers/userController.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "csv_file",
            maxCount: 1,
        },
    ]),
    registerUser
);

router.route("/login").post(loginUser);

export default router;
