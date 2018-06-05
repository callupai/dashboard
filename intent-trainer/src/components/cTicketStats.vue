<template>
  <div>

    <h1>Stats</h1>

    <el-main v-for="date in this.$store.state.statsByDates">
      <el-row>
        <el-col :span="24">
          <h4>{{date.date}}</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="date.data">
            <el-table-column
              prop="subject"
              label="Subject"
              sortable
              width="500">
            </el-table-column>
            <el-table-column
              prop="predicted_intent"
              label="Predicted Intent"
              sortable
              width="300">
            </el-table-column>
            <el-table-column
              prop="corrected_intent"
              label="Corrected Intent"
              sortable
              width="300">
            </el-table-column>
            <el-table-column
              prop="count(*)"
              label="Count"
              sortable
              width="180">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>

  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "LinkComponent",
  })
  export default class cTicketStats extends Vue {
    mounted() {
      const that = this;
      that.$store.commit("refreshStats");
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }

  .el-select .el-input {
    width: 110px;
  }
</style>
