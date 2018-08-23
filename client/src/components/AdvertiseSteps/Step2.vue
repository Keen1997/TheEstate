<template>
    <v-layout row wrap>
        <v-flex md2></v-flex>
        <v-flex sm12 md8>
        <v-layout column wrap>
            
            <v-card-title flat style="font-size:18px; color:#777 ; border-bottom: 1px solid #bbb;">รายละเอียดหลัก</v-card-title>

            <v-card flat>
            <v-container grid-list-md>  

            <div v-if='estateType=="ที่ดินเปล่า"'>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><h4 style='color:#999; font-size:17px; font-weight: normal;' ref='landArea'>ขนาดที่ดิน *</h4></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="ไร่" v-model='main.landArea.rai' type='number' min=1 placeholder="0"></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><span style="color: #666;">{{main.landArea.rai>999 ? '( '+ formatNumber(main.landArea.rai) + ' )' : ''}}</span></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="งาน" v-model='main.landArea.ngan' type='number' min=1 placeholder="0"></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="ตารางวา" v-model='main.landArea.squareWa' type='number' min=1 placeholder="0"></v-text-field></v-flex>
                </v-layout>
            </div> 

            <div v-else>
                <v-layout wrap row justify-center v-if='estateType!="อาคารพาณิชย์" && estateType!="คอนโด"'>  
                    <v-flex xs12 sm3 d-flex><v-form ref='allArea'>
                        <v-text-field label="พื้นที่ทั้งหมด (ตารางเมตร) *" v-model='main.allArea' placeholder="0" type='number' min=1 :rules="[() => !!main.allArea || 'จำเป็น', () => main.allArea >= 1 || '1 ขึ้นไป']"></v-text-field>
                        <span style="color: #666;">{{main.allArea>999 ? '( '+ formatNumber(main.allArea) + ' )' : ''}}</span> 
                    </v-form></v-flex>
                </v-layout>
                <v-layout style="margin-bottom:40px;"/>
                <v-layout wrap row justify-center>  
                    <v-flex xs12 sm3 d-flex><v-form ref='useAreaRule'>
                        <v-text-field label="พื้นที่ใช้สอย *" suffix="ตารางเมตร" v-model='main.useArea' placeholder="0" type='number' min=1 :rules="[() => !!main.useArea || 'จำเป็น', () => main.useArea >= 1 || '1 ขึ้นไป']"></v-text-field>
                        <span style="color: #666;">{{main.useArea>999 ? '( '+ formatNumber(main.useArea) + ' )' : ''}}</span>
                    </v-form></v-flex>
                </v-layout>
                <v-layout wrap row justify-center> 
                    <v-flex xs6 sm2 d-flex style="margin-right:24px;"><v-text-field label="กว้าง" v-model='main.width' suffix="เมตร"  type='number' min=1></v-text-field></v-flex>
                    <v-flex xs6 sm2 d-flex><v-text-field label="ยาว" v-model='main.height' suffix="เมตร" type='number'></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center> 
                    <v-flex xs6 sm2 d-flex style="margin-right:24px;"><v-form ref='allFloorRule'>
                        <v-text-field label="จำนวนชั้นทั้งหมด" v-model='main.allFloors' type='number' min=1 :rules="[() => main.allFloors <= 300 || 'จำวนวนชั้นมากเกินไป']"></v-text-field>
                    </v-form></v-flex>
                    <v-flex xs6 sm2 d-flex v-if='estateType=="อาคารพาณิชย์" || estateType=="คอนโด"'><v-form ref='floorNoRule'>
                        <v-text-field flat label="อยู่ชั้น *" v-model='main.floorNo' type='number' min=1 :rules="[() => main.floorNo >=1 || '1 ขึ้นไป', () => main.floorNo <=300 || 'ชั้นมากเกินไป']"></v-text-field><span style="display:none; color: red; font-style:italic" ref='floorsCheck'>เลขชั้นที่อยู่ต้องน้อยกว่าจำนวนชั้นทั้งหมด</span>
                    </v-form></v-flex>
                </v-layout>
                <v-layout style="margin-bottom:40px;"/>
                <v-layout wrap row justify-center  v-if='estateType!="อาคารพาณิชย์"'>
                    <v-flex xs12 sm2 d-flex><v-select flat label="จำนวนห้องนอน" v-model='main.bedrooms' :items="selects.rooms"></v-select></v-flex>
                    <v-flex xs12 sm2 d-flex><v-select flat label="จำนวนห้องน้ำ" v-model='main.bathrooms' :items="selects.rooms"></v-select></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>  
                    <v-flex xs12 sm2 d-flex><v-select flat label="เฟอร์นิเจอร์" v-model='main.furniture' :items="selects.furnitures"></v-select></v-flex>
                </v-layout>
                <v-layout wrap row justify-center> 
                    <v-flex xs12 sm2 d-flex><v-select flat label="ทิศ(ประตูหน้า)" v-model='main.direction' :items="selects.directions"></v-select></v-flex>
                </v-layout>
            </div>

            </v-container>
            </v-card>

            <v-card-title flat style="font-size:18px; color:#777 ; border-bottom: 1px solid #bbb;">ราคา</v-card-title>
            <v-card flat>
            <v-container grid-list-md>  

                <div v-if='sellType=="ขาย"'>
                    <v-layout wrap row justify-center>  
                        <v-flex xs12 sm3 d-flex><span style="color: #666;">{{main.price>999 ? '( '+ formatNumber(main.price) + ' บาท' + ' )' : ''}}</span></v-flex>
                    </v-layout>
                    <v-layout wrap row justify-center>  
                        <v-flex xs12 sm3 d-flex><v-form ref='sellRule'><v-text-field v-model='main.price' label="ราคาขาย" suffix='บาท' :rules="[() => main.price > 0 || 'จำเป็น']"></v-text-field></v-form></v-flex>
                    </v-layout>
                    
                     <v-layout wrap row justify-center style='padding:0 10px 0 10px;' v-if='estateType=="ที่ดินเปล่า"'>  
                        <v-flex xs12 sm1 d-flex><v-layout>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;' placeholder="0">{{sellPerLandArea}}</h4>
                        </v-layout></v-flex>
                        <v-flex xs12 sm2 d-flex><v-layout justify-end>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;'>ต่อตารางวา</h4>
                        </v-layout></v-flex>
                    </v-layout>

                    <v-layout wrap row justify-center style='padding:0 10px 0 10px;' v-else>  
                        <v-flex xs12 sm1 d-flex><v-layout>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;' placeholder="0">{{sellPerUseArea}}</h4>
                        </v-layout></v-flex>
                        <v-flex xs12 sm2 d-flex><v-layout justify-end>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;'>ต่อตารางเมตร</h4>
                        </v-layout></v-flex>
                    </v-layout>
                </div> 

                <div v-if='sellType=="เช่า"'>
                    <v-layout wrap row justify-center>  
                        <v-flex xs12 sm3 d-flex><v-form ref='sellRule'><v-text-field v-model='main.price' label="ราคาเช่า" placeholder="0" suffix='บาทต่อเดือน' :rules="[() => main.price > 0 || 'จำเป็น']"></v-text-field></v-form></v-flex>
                    </v-layout>

                    <v-layout wrap row justify-center style='padding:0 10px 0 10px;'>  
                        <v-flex xs12 sm2 d-flex><v-layout>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;' placeholder="0">{{main.price/4}}</h4>
                        </v-layout></v-flex>
                        <v-flex xs12 sm1 d-flex><v-layout justify-end>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;'>ต่อสัปดาห์</h4>
                        </v-layout></v-flex>
                    </v-layout>

                    <v-layout wrap row justify-center style='margin-top: 20px; padding: 0 10px 0 10px;'>  
                        <v-flex xs12 sm2 d-flex><v-layout>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;' placeholder="0">{{Math.round(main.price/30 * 100) / 100}}</h4>
                        </v-layout></v-flex>
                        <v-flex xs12 sm1 d-flex><v-layout justify-end>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;'>ต่อวัน</h4>
                        </v-layout></v-flex>
                    </v-layout>
                </div> 
            </v-container>
            </v-card>  

            <v-card-title flat style="font-size:18px; color:#777 ; border-bottom: 1px solid #bbb;">เพิ่มเติม</v-card-title>

            </v-layout>
            </v-flex>   
            <v-flex md2></v-flex> 

            <v-flex md3></v-flex>
            <v-flex sm12 md6>
            <v-layout column wrap>  

            <v-card height=auto flat>
            <v-container grid-list-md>

                
                <div v-if='estateType!="ที่ดินเปล่า"'>
                <v-layout wrap row >  
                    <v-flex xs12 sm12 d-flex><h4 style='color: #888; font-size: 17px; font-weight: normal; border-bottom: 1px solid #bbb; padding-bottom: 8px; margin: 30px 0 20px 0;'>ตัวเลือก</h4></v-flex>
                </v-layout>
                <v-layout wrap row justify-center v-if='estateType=="คอนโด"'>
                    <v-flex sm3 d-flex v-for='(option) in selects.options.condo' :key='option'>
                        <v-checkbox :label="option" :value="option" v-model='other.options'></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout wrap row justify-center v-else-if='estateType=="อาคารพาณิชย์"'>
                    <v-flex sm3 d-flex v-for='(option) in selects.options.commercial' :key='option'>
                        <v-checkbox :label="option" :value="option" v-model='other.options'></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout wrap row justify-center v-else>
                    <v-flex sm3 d-flex v-for='(option) in selects.options.house' :key='option'>
                        <v-checkbox :label="option" :value="option" v-model='other.options'></v-checkbox>
                    </v-flex>
                </v-layout>
                </div>

                <div style='margin-top:20px'>
                    <v-layout wrap row>  
                        <v-flex xs12 sm12 d-flex><h4 style='color: #888; font-size: 17px; font-weight: normal; border-bottom: 1px solid #bbb; padding-bottom: 8px; margin: 30px 0 20px 0;'>กำหนดเอง</h4></v-flex>
                    </v-layout>
                    <v-layout justify-center>
                    <v-flex sm12 md9><v-form ref="ownerRule">
                        <v-textarea 
                        v-model="other.owner" label="รายละเอียดเกี่ยวกับประกาศ *" height='400px' hint="ไม่มีรูปแบบ กำหนดเองได้เลย" :counter="1000"
                        :rules="[() => !!other.owner || 'จำเป็น',() => other.owner.length <= 1000 || 'ไม่เกิน 1000 ตัวอักษร']">
                        </v-textarea>
                    </v-form></v-flex>
                    </v-layout>
                </div>
                
            </v-container>
            </v-card>

        </v-layout>
        </v-flex>
        <v-flex md3></v-flex>

        <v-flex md2></v-flex>
        <v-flex sm12 md8>
        <v-layout column wrap>

            <v-layout row justify-space-between>
                <div style="cursor: pointer; margin:40px 0 30px 0;" @click="prevStep">
                    <v-btn color="primary" dark fab small depressed >
                        <v-icon style="font-size: 25px">navigate_before</v-icon>
                    </v-btn>
                    <span>ย้อนกลับ</span>
                </div>
                
                <div style="cursor: pointer; margin:40px 0 30px 0;" @click="nextStep">
                    <span>ถัดไป</span>
                    <v-btn color="primary" dark fab small depressed  >
                        <v-icon style="font-size: 25px">navigate_next</v-icon>
                    </v-btn>
                </div>
            </v-layout>
 
        </v-layout>
        </v-flex>
        <v-flex md2></v-flex>
        
    </v-layout>
</template>

<script>
import advertiseStore from '@/stores/advertiseStore'

export default {
    name: "Step2",
    data: () => ({
        main: {
            price: '',
            useArea: '', //เมตร
            width: '',
            height: '',
            allArea: '',
            landArea: {
                rai: null,
                ngan: null,
                squareWa: null
            },
            bedrooms: '',
            bathrooms: '',
            allFloors: null,
            floorNo: '',
            furniture: '',
            direction: ''
        },
        other: {
            options: [],
            owner: ''
        },
    }),
    computed: {
        selects() {
            return advertiseStore.state.selects
        },
        sellType() {
            return advertiseStore.state.data.main.sellType
        },
        estateType() {
            return advertiseStore.state.data.main.estateType
        },
        sellPerUseArea() {
            if (this.main.price>0 & this.main.useArea>0) return Math.round(this.main.price/this.main.useArea * 100) / 100
            else return ''
        },
        sellPerLandArea() {
            if (this.main.price>0 && this.main.landArea.rai>0 || this.main.landArea.ngan>0 || this.main.landArea.squareWa>0) 
                return Math.round(this.main.price/(this.main.landArea.rai * 400 + this.main.landArea.ngan * 100 + 1 * this.main.landArea.squareWa) * 100) / 100       
        },
    },
    methods: {
        formatNumber(number) {
            let parts = number.toString().split(".")
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            return parts.join(".")
        },
        checkData() {
            let pass = true

            // เฉพาะไม่ใช่ที่ดินเปล่า
            if (this.estateType != 'ที่ดินเปล่า') {
                if (this.estateType == 'คอนโด' || this.estateType == 'อาคารพาณิชย์') {
                    // เช็คหมายเลขชั้น
                    this.$refs.floorNoRule.validate()
                    // เช็คหมายเลขชั้นต้องมากกว่า 0 ชั้นต้องไม่มากเกินไป
                    if (this.main.floorNo <= 0 || this.main.floorNo > 300) pass = false 
                    // เช็คจำนวนชั้นทั้งหมดสูงสุด (ถ้ากรอก)
                    if (this.main.allFloors) {  
                        this.$refs.allFloorRule.validate()
                        if (this.main.allFloors > 300) pass = false

                        // ** does't work เช็คหมายเลขชั้นต้องน้อยกว่าเช็คจำนวนชั้นทั้งหมด

                        // if (this.main.allFloors < this.main.floorNo) {
                        //     this.$refs.floorsCheck.style.display = 'block'
                        //     pass = false 
                        // }

                    }
                }
                if (this.estateType != 'คอนโด' && this.estateType != 'อาคารพาณิชย์') {
                    // เช็คพื้นที่ทั้งหมด ต้องกรอก ไม่น้อยกว่า 1 ตารางเมตร (ไม่ใช่คอนโด, อาคารพาณิชย์)
                    this.$refs.allArea.validate() 
                    if (!this.main.allArea || this.main.allArea < 1) pass = false  
                    // พื้นที่ใช้สอยต้องน้อยกว่าพื้นที่ทั้งหมด ยังไม่ได้ทำ
                }
                // เช็คพื้นที่ใช้สอย
                this.$refs.useAreaRule.validate()
                if(this.main.useArea < 1) pass = false
                // รายละเอียดแบบเขียนเอง ไม่เกิน 1000 ตัวอักษร
                if (!this.other.owner || this.other.owner.length > 1000) {
                    this.$refs.ownerRule.validate() 
                    pass = false 
                }
            }

            // เฉพาะที่ดินเปล่า
            else {
                // เช็คทีขนาด่ดิน ต้องกรอก
                if (!this.main.landArea.rai && !this.main.landArea.ngan && !this.main.landArea.squareWa) {
                    this.$refs.landArea.style.color = 'red'
                    pass = false
                }
                // เช็คทีขนาด่ดิน ต้องมากกว่า 0
                if (this.main.landArea.rai <= 0 && this.main.landArea.ngan <= 0 && this.main.landArea.squareWa <= 0) {
                    this.$refs.landArea.style.color = 'red'
                    pass = false
                }
            }
            // (ทั้งหมด) เช็คราคา ต้องกรอก ต้องมากกว่า 0
            if (!this.main.price || this.main.price < 0) {
                this.$refs.sellRule.validate()
                pass = false
            }

            return pass
        },
        prevStep() {
            this.$emit('prevStep')
            this.other.options = []
        },
        nextStep() {
            if (this.checkData()) {
                this.$emit('nextStep')
                advertiseStore.dispatch('step2next', {mainDetail: this.main, options: this.other.options, owner: this.other.owner})
            }
        }
    },
    watch: {

        'main.landArea.squareWa'() {
            if (this.main.landArea.squareWa >= 100) {
                let ngan = Math.floor(this.main.landArea.squareWa / 100)
                let sqWa = this.main.landArea.squareWa % 100
                this.main.landArea.squareWa = sqWa
                this.main.landArea.ngan+= ngan
            }
        },
        'main.landArea.ngan'() {
            if (this.main.landArea.ngan >= 4) {
                let rai = Math.floor(this.main.landArea.ngan / 4)
                let ngan = this.main.landArea.ngan % 4
                this.main.landArea.ngan = ngan
                this.main.landArea.rai = rai
            }
        }

        // ** does't work

        // 'main.landArea'() {
        //     if (this.main.landArea.rai > 0 || this.main.landArea.ngan > 0 || this.main.landArea.squareWa > 0) {
        //         this.$refs.landArea.style.color = '#666'
        //     }
        // },

        // 'main.floorNo'(newVal, oldVal) {
        //     if (this.main.allFloors >= 0) {
        //         if (this.main.floorNo <= newVal) this.$refs.floorsCheck.style.display = 'none'
        //     }
        // },
        // 'main.allFloors'(newVal, oldVal) {
        //     if (this.main.allFloors >= 0) {
        //         if (newVal <= this.main.allFloors) this.$refs.floorsCheck.style.display = 'none'
        //     }
        // },
    }
}
</script>
