import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homepageImages: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
        ],
        courses: [
            {
                title: 'หลักสูตร 1',
                link: '/course/01'
            },
            {
                title: 'หลักสูตร 2',
                link: '/course/02'
            }
        ],
        advertiseSelects: {

            estateTypes: ["คอนโด", "บ้านเดี่ยว", "ทาวเฮาน์", "ตึกแถว", "ที่ดินเปล่า", "อาคารพาณิชย์"],

            furnitures: ['ไม่มี', 'บางส่วน', 'ครบชุด'],

            directions: ['เหนือ', 'ใต้', 'ตะวันตก', 'ตะวันออก', 'ตะวันตกเฉียงเหนือ', 'ตะวันตกเฉียงใต้', 'ตะวันออกเฉียงเหนือ', 'ตะวันออกเฉียงใต้'],

            rooms: [1, 2, 3, 4, 5, 6, 7, 'มากกว่า 7'],

        },

    },

    mutations: {

    },
    actions: {

    }
        
})
