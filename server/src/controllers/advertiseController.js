const con = require('../models')
const sqlEasy = require('../sqlEasy')
const moment = require('moment')



module.exports = {

    submitAdvertise(req, res) {      

        if (req.body.main.sellType != 'ขาย' && req.body.main.sellType != 'เช่า') {
            res.send('invalid sell type')
            return
        }
        
        let estateTypes = ["คอนโด", "บ้านเดี่ยว", "ทาวเฮาน์", "ตึกแถว", "ที่ดินเปล่า", "อาคารพาณิชย์"]
        if (estateTypes.indexOf(req.body.main.estateType)<0) {
            res.send('invalid estate type')
            return
        }

        req.checkBody('main.title', 'invalid title').isLength({min:20, max:120})
        req.checkBody('location.province', 'province null').notEmpty()
        req.checkBody('location.district', 'district null').notEmpty()

        if (req.body.main.estateType == 'คอนโด'|| req.body.main.estateType == 'อาคารพาณิชย์') {
            req.checkBody('mainDetail.floorNo', 'invalid floor number').notEmpty().isLength({min:1, max:300})
        }

        // เช็คที่เหลือ ....

        let errors = req.validationErrors()
        if (errors) {
            for (i in errors) res.send(errors[i].msg)           
            return
        }

        let options
        if (req.body.options) {
            options = '"' + req.body.options.join('","') + '"';
        }

        let sql = sqlEasy()
                .insertTo('estates')
                .columns(['estatetype', 'sellType', 'title', 'buildingName', 'location_province', 'location_district', 'location_subdistrict', 'location_road'
                        , 'location_lane', 'location_houseNo', 'location_postalcode', 'price', 'ownerdetail', 'created', 'Rai', 'Ngan', 'SquareWa', 'AllArea', 'UseArea'
                        , 'Width', 'Heigth', 'AllFloor', 'FloorNo', 'Bedrooms', 'Bathrooms', 'Furniture', 'Direction', 'Options'])
                .values([req.body.main.estateType, req.body.main.sellType, req.body.main.title, req.body.main.buildingName, req.body.location.province
                    , req.body.location.district, req.body.location.subDistrict, req.body.location.road, req.body.location.lane, req.body.location.houseNo
                    , req.body.location.postalCode, req.body.mainDetail.price, req.body.owner, moment().format(), req.body.mainDetail.landArea.rai, req.body.mainDetail.landArea.ngan
                    , req.body.mainDetail.landArea.squareWa, req.body.mainDetail.allArea, req.body.mainDetail.useArea, req.body.mainDetail.width, req.body.mainDetail.height
                    , req.body.mainDetail.allFloors, req.body.mainDetail.floorNo, req.body.mainDetail.bedrooms, req.body.mainDetail.bathrooms, req.body.mainDetail.furniture
                    , req.body.mainDetail.direction, options])
                .end()

        con.query(sql, function(err, result) {
            if (!err) {                  
                console.log('success')
                
                res.end('success')
            }
            else {
                console.log(err)
                res.end('fail')
              }
        })
                
    },
    
    uploadImg(req, res) {
        
    }

}