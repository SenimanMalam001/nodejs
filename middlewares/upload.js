const path = require('path');
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    cb(null, Date.now() + '.' + ext)
  },

})
module.exports = {
  uploadExcell: multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      var filetypes = /xlsx|xls/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (extname) {
        return cb(null, true);
      }
      cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
  }).single('file')
}
