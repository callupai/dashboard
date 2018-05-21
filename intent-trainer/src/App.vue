<template>
  <div id="app">
    <el-button type="text" @click="showLogin">click to open the Dialog</el-button>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  </span>
    </el-dialog>

    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";

  @Component
  export default class App extends Vue {
    dialogVisible: boolean = false;
    name: string = 'app';

    showLogin() {
      console.log("show login dialog");
      this.dialogVisible = true;
    }

    handleClose(done: any) {
      this.$confirm('Are you sure to close this dialog?')
        .then((_: any) => {
          done();
        })
        .catch((_: any) => {
        });
    }
  }
</script>

<style>
  @import './assets/style.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
