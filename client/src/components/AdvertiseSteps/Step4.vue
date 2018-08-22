<template>
    <v-layout row wrap style='background-color:#f7f7f7'>
        <v-flex md4></v-flex>
        <v-flex md4>
        <v-card style='margin-top:10px'><v-layout row wrap justify-center>
            <v-card-title><h4>โครงการ</h4></v-card-title>
            <v-card-title>{{main.name}}</v-card-title>
        </v-layout></v-card>   

        <v-card style='margin-top:60px'>
            <v-layout row wrap justify-center><v-card-title><h4>ข้อมูลหลัก</h4></v-card-title></v-layout>
            <v-divider></v-divider>

            <v-layout row wrap justify-center>
            <v-flex md10>
                
            <v-list-tile>
                <v-list-tile-content>ประเภทการขาย:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{main.sellType}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-content>ประเภทอสังหาริมทรัพย์:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{main.estateType}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-content>ที่ตั้ง:</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-content class="align-start">ราคา:</v-list-tile-content>
                <v-list-tile-content class="align-end" v-if='main.sellType=="ขาย"'>{{mainDetail.price}} บาท</v-list-tile-content>
                <v-list-tile-content class="align-end" v-else>{{mainDetail.price}} บาทต่อเดือน</v-list-tile-content>
            </v-list-tile>

            </v-flex></v-layout>

            <v-layout row wrap justify-center style='margin-bottom:20px'>
            <v-flex md7>
                <v-list-tile>
                    <v-list-tile-content class="align-start">จังหวัด:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.province}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">อำเภอ/เขต:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.district}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">ตำบล/แขวง:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.subDistrict}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">ถนน:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.road}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">ซอย:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.lane}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">บ้านเลขที่:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.houseNo}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content class="align-start">รหัสไปรษณีย์:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{location.postalCode}}</v-list-tile-content>
                </v-list-tile>
            </v-flex>
            </v-layout>

            <v-list-tile>
                <v-list-tile-content>ชื่อโครงการหรือชื่ออาคาร:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{main.projectName}}</v-list-tile-content>
            </v-list-tile>
            
        </v-card>

        <v-card style='margin-top:60px'>

            <v-layout row wrap justify-center><v-card-title><h4>รายละเอียดหลัก</h4></v-card-title></v-layout>
            <v-divider></v-divider>

            <div v-if='main.estateType=="ที่ดินเปล่า"'>
                <v-layout row wrap justify-center style='margin-top:10px'>
                    <v-list-tile>
                        <v-list-tile-content>ขนาดที่ดิน:</v-list-tile-content>
                    </v-list-tile>
                </v-layout>
                <v-layout row wrap justify-center style='margin-bottom:20px'>
                <v-flex md7>
                    <v-list-tile>
                        <v-list-tile-content class="align-start">ไร่:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.landArea.rai}}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                        <v-list-tile-content class="align-start">งาน:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.landArea.ngan}}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                        <v-list-tile-content class="align-start">ตารางวา:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.landArea.squareWa}}</v-list-tile-content>
                    </v-list-tile>
                </v-flex>
                </v-layout>
            </div>

            <div v-else>
                <v-layout row wrap justify-center style='margin-bottom:20px'>
                <v-flex md10>
                    <v-list-tile v-if='main.estateType!="อาคารพาณิชย์" && main.estateType!="คอนโด"'>
                        <v-list-tile-content>ขนาดที่ดิน:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.houseArea}} ตารางเมตร</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>พื้นที่ใช้สอย:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.area}} ตารางเมตร</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>กว้าง x ยาว:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.width}} x {{mainDetail.height}} ตารางเมตร</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>จำนวนชั้นทั้งหมด:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.allFloors}} ฃั้น</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if='main.estateType=="อาคารพาณิชย์" || main.estateType=="คอนโด"'>
                        <v-list-tile-content>อยู่ชั้น:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.floorNo}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if='main.estateType!="อาคารพาณิชย์"'>
                        <v-list-tile-content>จำนวนห้องนอน:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.bedrooms}} ห้อง</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if='main.estateType!="อาคารพาณิชย์"'>
                        <v-list-tile-content>จำนวนห้องน้ำ:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.bathrooms}} ห้อง</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>เฟอร์นิเจอร์:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.furniture}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>ทิศ:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{mainDetail.direction}}</v-list-tile-content>
                    </v-list-tile>
                </v-flex>
                </v-layout>
            </div>

        </v-card>

        <v-card style='margin-top:60px' v-if='options.length != 0'>
            <v-layout row wrap justify-center><v-card-title><h4>รายละเอียดเพิ่มเติม</h4></v-card-title></v-layout>
            <v-divider></v-divider>

            <v-layout row wrap style='margin-bottom:20px'>
                <v-flex md3 v-for='option in options' :key="option" style='margin:20px 0 20px 0'><v-list-tile-content class="align-center">{{option}}</v-list-tile-content></v-flex>      
            </v-layout>
        </v-card>  

        <v-card style='margin-top:60px'>
            <v-layout row wrap justify-center><v-card-title><h4>กำหนดเอง</h4></v-card-title></v-layout>
            <v-divider></v-divider>

            <v-layout row wrap style='margin-bottom:20px'>
                    <v-flex md12 style="overflow-y: scroll; height: 300px">{{owner}}</v-flex>
            </v-layout>
        </v-card> 

        </v-flex>
        <v-flex md4></v-flex>

        <v-flex md2></v-flex>
        <v-flex md8>

        <v-layout row justify-space-between>
            <div style="cursor: pointer; margin:40px 0 30px 0;" @click="prevStep">
                <v-btn color="primary" dark fab small depressed>
                    <v-icon style="font-size: 25px">navigate_before</v-icon>
                </v-btn>
                <span>ย้อนกลับ</span>
            </div>
            
            <v-btn style="margin:40px 0 30px 0; border-radius: 8px; font-size:18px;" color="primary" depressed @click='submit'>ยืนยัน</v-btn> 
        </v-layout>
        </v-flex>
        <v-flex md2></v-flex>
    </v-layout>   
</template>

<script>
import advertiseStore from '@/stores/advertiseStore'

export default {
    name: "Step4",
    computed: {
        main() {
            return advertiseStore.state.data.main
        },
        location() {
            return advertiseStore.state.data.location
        },
        mainDetail() {
            return advertiseStore.state.data.mainDetail
        },
        options() {
            return advertiseStore.state.data.options
        },
        owner() {
            return advertiseStore.state.data.owner
        },
        numberOfImg() {
            return advertiseStore.state.data.numberOfImg
        }
    },
    methods: {
        prevStep() {
            this.$emit('prevStep')
        },
        submit() {

        }
    }
}
</script>
