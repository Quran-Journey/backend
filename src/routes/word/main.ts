import { Router } from "express";
import rootRouter from "./root";
import meaningRouter from "./meaning";
import verseWordRouter from "./verseWord";

const router: Router = Router();

router.use("/word", rootRouter);
router.use("/word/root", meaningRouter);
router.use("/word", verseWordRouter);

export default router;
