<template>
  <div>

    <v-jumbotron :gradient="gradient" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Course 2</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-text-field
      v-model="gradient"
      label="Gradient"
    ></v-text-field>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >

      <v-tab
        v-for="n in data"
        :key="n"
        ripple
      >
        {{ n.title }}

      </v-tab>
      <v-tab-item
        v-for="n in data"
        :key="n"
      >
        <v-card flat>
          <v-card-text>{{ n.content }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <div class="text-xs-center mt-3">
      <v-btn @click="next" color="cyan" dark>ต่อไป</v-btn>
    </div>

  </div>
</template>
<script>
export default {
  data: () => ({
    gradient: "to top, #fbc2eb, #a6c1ee",
    active: null,
    data: [
        {
            title: 'เกี่ยวกับคอนโด',
            content: 'เนื้อหาเกี่ยวกับคอนโด'
        },
        {
            title: 'วิธีเลือก',
            content: 'เนื้อหาเกี่ยวกับวิธีเลือกคอนโด'
        },
        {
            title: 'คอนโดน่าสนใจ',
            content: 'เนื้อหาเกี่ยวกับคอนโดที่น่าสนใจในตอนนี้'
        },
        {
            title: 'เปรียบเทียบคอนโดในปัจจุบัน',
            content: 'เนื้อหา, สถิติต่างๆ'
        }
    ]
  }),
  methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      }
    }
}
</script>