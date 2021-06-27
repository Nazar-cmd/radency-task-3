import { Router } from "express";

const router = Router();

router.get("/");

router.get("/:id/");

router.get("/notes/stats");

router.post("/");

router.delete("/:id/");

router.patch("/:id/");

export default router;
