import express from "express"
import { deleteProd, getAllProd, getProdById, postProd, updateProd } from "../controllers/products.js"

const router = express.Router()

router.get("/", getAllProd)
router.get("/:id", getProdById)
router.post("/", postProd)
router.put("/:id", updateProd)
router.delete("/:id", deleteProd)

export default router