<template>
  <v-app class='setFont'>

    <v-toolbar app dark color="primary">

      <v-toolbar-title @click="$router.push('/')">โลโก้</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-btn flat class='setFont' @click="$router.push('/')">หน้าหลัก</v-btn>

        <v-btn flat class='setFont'>ประวัติบริษัท</v-btn>

        <v-menu offset-y>
          <v-btn slot="activator" color="primary" dark depressed class='setFont'>
            หลักสูตรอบรม
            <span style='padding-left:4px'></span>
            <v-icon dark>arrow_drop_down</v-icon>
            <span style='margin-left:-12px'></span>
          </v-btn>
        
          <v-list v-for="(course,i) in courses" :key="i">
              <v-list-tile style="cursor: pointer;" @click="$router.push(course.link)">
                <v-list-tile-title class='setFont'>{{course.title}}</v-list-tile-title>
              </v-list-tile>  
          </v-list>
        </v-menu>

        <v-btn flat class='setFont'>ค้นหา</v-btn>
        <v-btn flat class='setFont'>ค้นหาบนแผนที่</v-btn>
        <v-btn flat class='setFont' @click="$router.push('/advertise')">ลงประกาศ ฟรี!</v-btn>
        
      </v-toolbar-items>

    </v-toolbar>

    <v-content>
        <router-view/>
    </v-content>
    
  </v-app>
</template>

<script>
import webpageStore from '@/stores/webpageStore'

export default {
  name: "App",
  computed: {
    courses() {
      return webpageStore.state.courses
    }
  }
}
</script>

<style>
  
  .setFont
  {
    font-family: 'Maitree', serif;
    font-size: 16px;
  }

</style>


