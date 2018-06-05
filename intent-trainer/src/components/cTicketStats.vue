<template>
  <div>
    <h1>Stats</h1>
    <el-table :data="this.$store.state.ticketStats">
      <el-table-column
        prop="date(created_at)"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="count(*)"
        label="Count"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    name: "LinkComponent",
  })
  export default class cTicketStats extends Vue {
    aggregate1: any;

    mounted() {
      const that = this;
      that.$store.commit("refreshStats")
      // axios({
      //   url: 'http://dashboard.callup.ai:8080/stats/ticket?column=count(*)&group=subject'
      // }).then(function(res){
      //   console.log("stats", res.data.data);
      //   that.aggregate1 = res.data.data;
      // })

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
