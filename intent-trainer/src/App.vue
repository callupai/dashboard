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

    <el-header>
      <el-menu v-if="$store.state.user.token"
               mode="horizontal"
               background-color="#fff"
               text-color="#000"
               active-text-color="#ffd04b">
        <el-menu-item index="1" disabled>Call up</el-menu-item>
        <el-submenu index="2">
          <template slot="title">User {{userProfile.email}}</template>
          <el-menu-item index="2-1" @click="logout">Logout</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">

        </el-menu-item>
      </el-menu>

    </el-header>

    <el-container style="height: 91vh">

      <el-aside width="200px">
        <el-menu>
          <a href="#/">
            <el-menu-item index="1-1">
              Tickets List
            </el-menu-item>
          </a>
          <a href="#/ticket/stats">
            <el-menu-item index="1-2">
              Tickets stats
            </el-menu-item>
          </a>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view v-if="$store.state.user.token"/>
      </el-main>

    </el-container>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";

  @Component
  export default class App extends Vue {
    dialogVisible: boolean = false;
    userProfile: any = {};
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
      if (this.$store.state.user.token) {
        let userProfile = JSON.parse(window.localStorage.getItem("user") as string)
        this.userProfile = userProfile;
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
    color: #2c3e50;
  }
</style>
