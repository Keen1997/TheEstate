<template>
    
    <v-layout row wrap>
        <v-flex md2></v-flex>
        <v-flex sm12 md8>
        <v-layout column wrap>

            <v-card-title flat style="font-size:18px; color:#777; border-bottom: 1px solid #bbb;">ข้อมูลพื้นฐาน</v-card-title>
            
            <v-card flat>
            <v-container grid-list-md>   
            <v-layout wrap row justify-center>

                <v-flex sm6 md4>
                    <v-form ref='rule1'><v-radio-group row v-model='main.sellType' :rules="[() => !!main.sellType || 'จำเป็น']">
                        <v-radio color="primary" label="ขาย" value="ขาย"></v-radio>
                        <v-radio color="primary" label="เช่า" value="เช่า"></v-radio> *
                    </v-radio-group></v-form>
                </v-flex>
                
                <v-flex sm5 md3><v-form ref='rule2'>
                    <v-select :items="selects.estateTypes" v-model='main.estateType' label="ประเภทอสังหาริมทรัพย์ *" :rules="[() => !!main.estateType || 'จำเป็น']"></v-select>
                </v-form></v-flex>
                </v-layout>
                
                <v-layout justify-center>
                <v-flex sm12 md9><v-form ref='rule3'>
                    <v-text-field 
                    v-model="main.name" :counter="120" label="หัวข้อประกาศ *" 
                    :rules="[
                    () => !!main.name || 'จำเป็น',
                    () => main.name.length <= 120 || 'ไม่เกิน 120 ตัวอักษร',]">
                    </v-text-field>
                </v-form></v-flex>
                </v-layout>

            </v-container>
            </v-card>

            <v-card-title flat style="font-size:18px; color:#777 ; border-bottom: 1px solid #bbb;">ข้อมูลสถานที่</v-card-title>

            <v-card height=auto flat>
            <v-container grid-list-md>
                <v-layout wrap row justify-center style="margin-top:20px;">
                    <v-flex xs12 sm3 d-flex><v-layout wrap row>
                        <span ref='provinceCheck' style="color:#777;">จังหวัด *</span>
                        <ThailandAutoComplete class='thaiAddressAuto' v-model="location.province" type="province" @select="select" color="#1976d2"/>
                    </v-layout></v-flex>
                    <v-flex xs12 sm3 d-flex><v-layout wrap row>
                        <span style="color:#777;" ref='districtCheck'>อำเภอ/เขต *</span>
                        <ThailandAutoComplete class='thaiAddressAuto' v-model="location.district" type="district" @select="select" color="#1976d2"/>
                    </v-layout></v-flex>
                    <v-flex xs12 sm3 d-flex><v-layout wrap row>
                        <span style="color:#777;">ตำบล/แขวง</span>
                        <ThailandAutoComplete class='thaiAddressAuto' v-model="location.subDistrict" type="amphoe" @select="select" color="#1976d2"/>
                    </v-layout></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm3 d-flex><v-text-field v-model="location.road" label="ถนน" flat></v-text-field></v-flex>
                    <v-flex xs12 sm3 d-flex><v-text-field v-model="location.lane" label="ซอย" flat></v-text-field></v-flex>
                    <v-flex xs12 sm3 d-flex></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm3 d-flex><v-text-field v-model="location.houseNo" label="บ้านเลขที่" flat></v-text-field></v-flex>
                    <v-flex xs12 sm3 d-flex><v-text-field v-model="location.postalCode" label="รหัสไปรษณีย์" flat></v-text-field></v-flex>
                    <v-flex xs12 sm3 d-flex></v-flex>
                </v-layout>
                <v-layout wrap row justify-center>
                    <v-flex xs12 sm9 d-flex>
                        <v-text-field
                        v-model="main.projectName" :counter="50">
                        <div slot="label">ชื่อโครงการหรือชื่ออาคาร <small>(ถ้ามี)</small></div>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card>

            <v-layout row justify-end>
            
                <div
                style="cursor: pointer; margin:40px 0 30px 0;"
                @click="nextStep">
                    <span>ถัดไป</span>
                    <v-btn color="primary" dark fab small depressed>
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
  name: "Step1",
  data: () => ({
    main: {
        name: '',
        sellType: '',
        estateType: '',
        projectName: '',
    },
    location: {
        province: '',
        district: '',
        subDistrict: '',
        road: '',
        lane: '',
        houseNo: '',
        postalCode: '',
    },
  }),
    computed: {
        selects() {
            return advertiseStore.state.selects
        }
    },
    methods: {
        checkData() {

            let pass = true

            this.$refs.rule1.validate()
            this.$refs.rule2.validate()
            this.$refs.rule3.validate()

            if (!this.main.sellType) pass = false
            
            if (!this.main.estateType) pass = false

            if (!this.main.name) pass = false

            if (!this.location.province) {
                this.$refs.provinceCheck.style.color = 'red'
                pass = false
            }

            if (!this.location.district) {
                this.$refs.districtCheck.style.color = 'red'
                pass = false
            }

            return pass
        
        },
        nextStep() {
            if (this.checkData()) {
                this.$emit('nextStep')
                advertiseStore.dispatch('step1next', {main: this.main, location: this.location})
            }
        },
        select (address) {
            this.location.province = address.province
            this.location.district = address.district
            this.location.subDistrict = address.amphoe
        }
    },
    watch: {
        'location.province'() {
            if (this.location.province) {
                this.$refs.provinceCheck.style.color = '#666'
            }
        },
        'location.district'() {
            if (this.location.district) {
                this.$refs.districtCheck.style.color = '#666'
            }
        }
    }
}
</script>

<style scoped>
  
    .thaiAddressAuto
    {
        border: 2px solid #eee;
        border-radius: 10px;
        padding: 0 0 0 0;
    }

</style>