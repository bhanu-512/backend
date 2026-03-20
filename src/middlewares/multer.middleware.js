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
export const upload = multer({ storage, })

/*multipart/form-data (file uploads)
Without Multer ❌
Express cannot read files (images, videos, PDFs)
With Multer ✅
Files are received
Stored on server
Available in req.file / req.files
---------------------------------------
When frontend sends a request:

Content-Type: multipart/form-data

Multer:

Reads file

Saves it in ./public/temp
Adds info to req.files
👉 It does NOT check file type unless you tell it to
*/