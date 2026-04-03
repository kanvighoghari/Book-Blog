const express = require("express")
const router = express.Router();
const bookController = require("../controller/bookController");
const multer = require('multer');
const authMiddleware = require("../middleware/auth")

const upload = multer({
    storage : multer.memoryStorage()
})


router.get("/" , bookController.getBooks);
router.get("/:id",bookController.getBookById);
router.post("/" , authMiddleware ,upload.single("coverImage"), bookController.createBook);
router.put("/:id",upload.single("coverImage"),bookController.editBook);
router.delete("/:id",bookController.deleteBook);

module.exports = router;