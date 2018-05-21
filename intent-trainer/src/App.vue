<template>
  <div id="app">
    <el-dialog
      title="Call-Up Trainer Login"
      :visible.sync="dialogVisible"
      width="30%" :close-on-press-escape="false" :show-close="false" :close-on-click-modal="false">
      <el-form :model="authForm" class="auth-form">
        <el-form-item label="Username">
          <el-input v-model="authForm.username" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="authForm.password">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="tryLogin">Login</el-button>
  </span>
    </el-dialog>

    <el-menu v-if="$store.state.user.token" class="el-menu-demo" mode="horizontal">
      <el-submenu index="2">
        <template slot="title">User</template>
        <el-menu-item index="2-1" @click="logout">Logout</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view v-if="$store.state.user.token"/>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";

  @Component
  export default class App extends Vue {
    dialogVisible: boolean = false;
    name: string = 'app';
    authForm: any = {
      username: "",
      password: ""
    };

    tryLogin() {
      console.log("login", this.authForm);
      this.$store.state.client.actionManager.doAction("user", "signin", {
        email: this.authForm.username,
        password: this.authForm.password,
      }).then(function (authResponse: any) {
        console.log("sign in action response", authResponse)
      })
    }

    logout() {
      window.localStorage.clear();
      this.$store.commit("logout");
      this.dialogVisible = true;
    }

    showLogin() {
      console.log("show login dialog");
      this.dialogVisible = true;
    }

    mounted() {
      console.log("mounted app", this.$store.state.user.token);
      if (!this.$store.state.user.token) {
        this.dialogVisible = true;
      }
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
  }
</style>
