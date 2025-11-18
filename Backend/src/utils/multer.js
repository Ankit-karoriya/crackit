import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/temp');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage,
    limits: {fileSize: 20 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const allowed = [
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/jpg",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if(allowed.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error("Only PDF, DOC, DOCX & Image files are allowed"));
        }
    }
})