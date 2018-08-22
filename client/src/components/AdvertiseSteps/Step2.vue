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
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="ไร่" v-model='main.landArea.rai' placeholder="0"></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="งาน" v-model='main.landArea.ngan' placeholder="0"></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm2 d-flex><v-text-field suffix="ตารางวา" v-model='main.landArea.squareWa' placeholder="0"></v-text-field></v-flex>
                </v-layout>
            </div> 

            <div v-else>
                <v-layout wrap row justify-center v-if='estateType!="อาคารพาณิชย์" && estateType!="คอนโด"'>  
                    <v-flex xs12 sm3 d-flex><v-form ref='houseArea'><v-text-field label="ขนาดที่ดิน (ตารางเมตร) *" v-model='main.houseArea' placeholder="0" type='number' min=1 :rules="[() => !!main.houseArea || 'จำเป็น', () => main.houseArea >= 10 || '10 ขึ้นไป']"></v-text-field></v-form></v-flex>
                </v-layout>
                <v-layout style="margin-bottom:40px;"/>
                <v-layout wrap row justify-center>  
                    <v-flex xs12 sm3 d-flex><v-form ref='ruleArea'><v-text-field label="พื้นที่ใช้สอย *" suffix="ตารางเมตร" v-model='main.area' placeholder="0" type='number' min=1 :rules="[() => !!main.area || 'จำเป็น', () => main.area >= 10 || '10 ขึ้นไป']"></v-text-field></v-form></v-flex>
                </v-layout>
                <v-layout wrap row justify-center> 
                    <v-flex xs6 sm2 d-flex style="margin-right:24px;"><v-text-field label="กว้าง" v-model='main.width' suffix="เมตร"  type='number' min=1></v-text-field></v-flex>
                    <v-flex xs6 sm2 d-flex><v-text-field label="ยาว" v-model='main.height' suffix="เมตร" type='number'></v-text-field></v-flex>
                </v-layout>
                <v-layout wrap row justify-center> 
                    <v-flex xs6 sm2 d-flex style="margin-right:24px;"><v-text-field label="จำนวนชั้นทั้งหมด" v-model='main.allFloors' type='number' min=1></v-text-field></v-flex>
                    <v-flex xs6 sm2 d-flex v-if='estateType=="อาคารพาณิชย์" || estateType=="คอนโด"'><v-form ref='ruleFloorNo'><v-text-field flat label="อยู่ชั้น *" v-model='main.floorNo' type='number' min=1 :rules="[() => main.floorNo >=1 || '1 ขึ้นไป']"></v-text-field><span style="display:none; color: red; font-style:italic" ref='floorsCheck'>เลขชั้นที่อยู่ต้องน้อยกว่าจำนวนชั้นทั้งหมด</span></v-form></v-flex>
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
                        <v-flex xs12 sm3 d-flex><v-text-field v-model='main.price' label="ราคาขาย" suffix='บาท'></v-text-field></v-flex>
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
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;' placeholder="0">{{sellPerArea}}</h4>
                        </v-layout></v-flex>
                        <v-flex xs12 sm2 d-flex><v-layout justify-end>
                            <h4 style='color: #444; font-size: 16px; font-weight: normal;'>ต่อตารางเมตร</h4>
                        </v-layout></v-flex>
                    </v-layout>
                </div> 

                <div v-else>
                    <v-layout wrap row justify-center>  
                        <v-flex xs12 sm3 d-flex><v-text-field v-model='main.price' label="ราคาเช่า" placeholder="0" suffix='บาทต่อเดือน'></v-text-field></v-flex>
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
                    <v-flex sm12 md9>
                        <v-textarea 
                        v-model="other.owner" label="รายละเอียดเกี่ยวกับประกาศ *" height='400px' hint="ไม่มีรูปแบบ กำหนดเองได้เลย" :counter="1000"
                        :rules="[() => !!other.owner || 'จำเป็น',() => other.owner.length <= 1000 || 'ไม่เกิน 1000 ตัวอักษร']">
                        </v-textarea>
                    </v-flex>
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
            area: '', //เมตร
            width: '',
            height: '',
            houseArea: '',
            landArea: {
                rai: 0,
                ngan: 0,
                squareWa: 0
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
        sellPerArea() {
            if (this.main.price>0 & this.main.area>0) return Math.round(this.main.price/this.main.area * 100) / 100
            else return ''
        },
        sellPerLandArea() {
            if (this.main.price>0 && this.main.landArea.rai>0 || this.main.landArea.ngan>0 || this.main.landArea.squareWa>0) 
                return Math.round(this.main.price/(this.main.landArea.rai * 400 + this.main.landArea.ngan * 100 + 1 * this.main.landArea.squareWa) * 100) / 100       
        }
    },
    methods: {
        checkData() {
            let pass = true

            if (this.estateType != 'ที่ดินเปล่า') {
                if (this.estateType == 'คอนโด' || this.estateType == 'อาคารพาณิชย์') {
                    this.$refs.ruleFloorNo.validate()
                    if (this.main.floorNo <= 0) pass = false 
                    if (this.main.allFloors) {  
                        if (this.main.floorNo > this.main.allFloors) {
                            this.$refs.floorsCheck.style.display = 'block'
                            pass = false 
                            
                        }
                    }
                }
                if (this.estateType != 'คอนโด' && this.estateType != 'อาคารพาณิชย์') {
                    this.$refs.houseArea.validate() 
                    if (this.main.houseArea != 0 || this.main.houseArea < 10) pass = false  
                }
                this.$refs.ruleArea.validate()
                if(this.main.area < 10) pass = false
            }
            else {
                if (this.main.landArea.rai == 0 && this.main.landArea.ngan == 0 && this.main.landArea.squareWa == 0) {
                    this.$refs.landArea.style.color = 'red'
                    pass = false
                }
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
        },
    },
    watch: {
        'main.landArea'() {
            if (this.main.landArea.rai > 0 || this.main.landArea.ngan > 0 || this.main.landArea.squareWa > 0) {
                this.$refs.landArea.style.color = '#666'
            }
        },
        'main.floorNo'() {
            if (this.main.allFloors) {
                if (this.main.floorNo <= this.main.allFloors) this.$refs.floorsCheck.style.display = 'none'
            }
        },
        'main.allFloors'() {
            if (this.main.allFloors) {
                if (this.main.floorNo <= this.main.allFloors) this.$refs.floorsCheck.style.display = 'none'
            }
        },
    }
}
</script>
