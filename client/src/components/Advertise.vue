<template>
  <v-stepper v-model="e1">

    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">ข้อมูลทั่วไป</v-stepper-step>
        
      <v-divider></v-divider>
    
      <v-stepper-step :complete="e1 > 2" step="2">รายละเอียด</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">รูปภาพ / เอกสาร</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">สรุปข้อมูล</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>

      <v-stepper-content step="1">      
        <Step1 @nextStep='nextStep'/>
      </v-stepper-content>

      <v-stepper-content step="2">    
        <Step2 @nextStep='nextStep' @prevStep='prevStep'/> 
      </v-stepper-content>

      <v-stepper-content step="3">
        <Step3 @nextStep='nextStep' @prevStep='prevStep'/>
      </v-stepper-content>

      <v-stepper-content step="4">
        <Step4 @prevStep='prevStep'/>
      </v-stepper-content>
    </v-stepper-items>

  </v-stepper>
  
</template>

<script>
import Step1 from '@/components/AdvertiseSteps/Step1'
import Step2 from '@/components/AdvertiseSteps/Step2'
import Step3 from '@/components/AdvertiseSteps/Step3'
import Step4 from '@/components/AdvertiseSteps/Step4'

export default {
    data: () => ({
      e1: 1
    }),
    components: {
        Step1, Step2, Step3, Step4
    },
    methods: {
        prevStep() {
            this.e1-=1
        },
        nextStep() {
            this.e1+=1
        },
    }
}
</script>

<style>
    .v-stepper{
        box-shadow: none;
    }
</style>
