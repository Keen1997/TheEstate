const multer  = require('multer')
const advertiseController = require('./controllers/advertiseController')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/images/advertise')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let upload = multer({ storage: storage })

let cpUpload = upload.fields([{ name: 'main', maxCount: 1 }, { name: 'imgs', maxCount: 10 }])

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('Hello !')
    })

    app.post('/advertiseSubmit', advertiseController.submitAdvertise)

    app.post('/uploadImg', cpUpload, advertiseController.uploadImg)

}