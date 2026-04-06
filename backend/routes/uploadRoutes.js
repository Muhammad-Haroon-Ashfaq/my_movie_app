import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs'; // Add this

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase(); // Case sensitive fix
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Images only (jpg, jpeg, png, webp)"), false);
    }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        } else if (req.file) {
            // Railway par domain ke saath full path bhejna behtar hai
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/uploads/${req.file.filename}`, // Path consistency
            });
        } else {
            res.status(400).send({ message: "No image file provided" });
        }
    });
});

export default router;