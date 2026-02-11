import multer from "multer"
// Whenever a user uploads a file (image / video / PDF / etc.) from frontend → backend, Multer helps you receive and store that file.
// Without Multer ❌
// Express cannot read files sent via forms (multipart/form-data)
// With Multer ✅
// Files are read,Stored on server or cloud,Available inside req.file or req.files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage, })
