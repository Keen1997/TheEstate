<template>
    <v-layout row wrap>
        <v-flex md2></v-flex>
        <v-flex sm12 md8>
        <v-layout column wrap>
            
            <v-card flat>
            <v-container grid-list-md>  
                <v-layout wrap row justify-center>  
                <v-flex sm12 md4 @click='$refs.imageInput.click()' style='margin-bottom: 20px; cursor: pointer;'>
                    <v-text-field box messages='เฉพาะรูปภาพเท่านั้น' v-model='input' append-icon='attach_file' @keyup='input="กดเพื่อเพิ่มรูปภาพ"' @keydown='input="กดเพื่อเพิ่มรูปภาพ"'></v-text-field>
                    <input
                        type="file"
                        style="display: none"
                        ref="imageInput"
                        accept="image/*"
                        @change="onFileSelected"
                        multiple="multiple"
                    >
                </v-flex>
                </v-layout>

                <v-layout wrap row>
                    <div ref="fileDisplayArea"></div>
                </v-layout>
            </v-container>
            </v-card>
            
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
  name: "Step3",
  data: () => ({
    input: 'กดเพื่อเพิ่มรูปภาพ',
    numberOfImg: 0
  }),
  methods: {
        onFileSelected(e) {

            const fileDisplayArea = this.$refs.fileDisplayArea

            const files = e.target.files

            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                if (!file.type.match('image')) continue

                let Reader = new FileReader();
                Reader.addEventListener("load", (event) => {
                    let img = new Image()
                    img.style.height = '200px'
                    img.style.paddingLeft = '10px'
                    img.style.paddingRight = '10px'
                    img.src = Reader.result
                    this.numberOfImg+=1

                    fileDisplayArea.appendChild(img)
                })
                Reader.readAsDataURL(file)
            }
        },
        chooseMainImage() {
            
        },
        checkData() {
            return true
        },
        prevStep() {
            this.$emit('prevStep')
        },
        nextStep() {
            if (this.checkData()) {
                this.$emit('nextStep')
                advertiseStore.dispatch('step3next', {numberOfImg: this.numberOfImg})
            }
        }
  }
}
</script>
