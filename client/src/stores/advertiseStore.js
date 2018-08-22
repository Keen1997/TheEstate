import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {

        selects: {

            estateTypes: ["คอนโด", "บ้านเดี่ยว", "ทาวเฮาน์", "ตึกแถว", "ที่ดินเปล่า", "อาคารพาณิชย์"],

            furnitures: ['ไม่มี', 'บางส่วน', 'ครบชุด'],

            directions: ['เหนือ', 'ใต้', 'ตะวันตก', 'ตะวันออก', 'ตะวันตกเฉียงเหนือ', 'ตะวันตกเฉียงใต้', 'ตะวันออกเฉียงเหนือ', 'ตะวันออกเฉียงใต้'],

            rooms: [1, 2, 3, 4, 5, 6, 7, 'มากกว่า 7'],

            options: {

                condo: ['วิวสวย', 'ห้องมุม', 'ห้องใหญ่พิเศษ', 'ระเบียง', 'ห้องครัว', 'ตู้เย็น', 'เครื่องทำน้ำอุ่น', 'เครื่องปรับอากาศ', 'อ่างอาบน้ำ',
                    'รักษาความปลอดภัย 24 ชม', 'กล้องวงจรปิด', 'ที่จอดรถ', 'ห้องประชุม', 'ห้องสมุด', 'ซักอบรีด', 'ฟิสเนต', 'ซาวน่า',
                    'ร้านสะดวกซื้อ', 'ร้านอินเทอร์เน็ต', 'ใกล้รถไฟฟ้า', 'ใกล้โรงพยาบาล', 'ใกล้ห้างสรรพสินค้า', 'ใกล้สนามกีฬา', 'ใกล้สวนสาธารณะ'],

                house: ['วิวสวย', 'ที่จอดรถ', 'ดาดฟ้า', 'สระว่ายน้ำ', 'ห้องเก็บของ', 'กล้องวงจรปิด', 'รปภ หมู้บ้าน', 'เครื่องทำน้ำอุ่น', 'เครื่องปรับอากาศ',
                    'อ่างอาบน้ำ', 'เครื่องซักผ้า', 'เตาแก็ส', 'เครื่องดูดควัน', 'เตียงนอน', 'ใกล้ร้านสะดวกซื้อ', 'ใกล้รถไฟฟ้า', 'ใกล้โรงพยาบาล', 'ใกล้ห้างสรรพสินค้า',
                    'ใกล้สนามกีฬา', 'ใกล้สวนสาธารณะ'],

                commercial: ['ใกล้รถไฟฟ้า', 'ที่จอดรถ', 'ห้องประชุม', 'ห้องสมุด', 'ห้องใหญ่พิเศษ', 'วิวสวย', 'กล้องวงจรปิด', 'รักษาความปลอดภัย 24 ชม']

            }

        },

        data: {
            step: 1,
            main: {},
            location: {},
            mainDetail: {},
            options: {},
            owner: '',
            numberOfImg: 0
        },
        
    },

    mutations: {
        setMain(state, data){
            state.data.main = data
        },
        setLocation(state, data){
            state.data.location = data
        },
        setMainDetail(state, data){
            state.data.mainDetail = data
        },
        setOptions(state, data){
            state.data.options = data
        },
        setOwner(state, data){
            state.data.owner = data
        },
        setNumberOfImg(state, data){
            state.data.numberOfImg = data
        },
    },
    actions: {
        step1next(context, data){
            context.commit('setMain', data.main)
            context.commit('setLocation', data.location)
        },
        step2next(context, data){
            context.commit('setMainDetail', data.mainDetail)
            context.commit('setOptions', data.options)
            context.commit('setOwner', data.owner)
        },
        step3next(context, data){
            context.commit('setNumberOfImg', data.numberOfImg)
        },
    }
})