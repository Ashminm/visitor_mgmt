const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    },
});

const fileFilter = (req, file, callback) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"];
    
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Only .png, .jpg, .jpeg, .webp, .gif files are allowed!!"), false);
    }
};

const multerConfig = multer({
    storage,
    fileFilter, 
});

module.exports = multerConfig;
