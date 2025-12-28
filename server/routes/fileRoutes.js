import express from "express";
import validateIdMiddleware from "../middlewares/validateIdMiddleware.js";
import {
  getFile,
  uploadFile,
  renameFile,
  deleteFile,
} from "../controllers/fileControllers.js";

const router = express.Router();

router.param("parentDirId", validateIdMiddleware);
router.param("id", validateIdMiddleware);

router.post("/:parentDirId?", uploadFile);

router.get("/:id", getFile);

// PATCH
router.patch("/:id", renameFile);

// DELETE
router.delete("/:id", deleteFile);

export default router;
