<template>
  <div>
    <div style="text-align: center; padding-top: 30px;">
      What is the correct intent?
      <br/>
      Case Description: {{caseDescription}}
    </div>
    <div class="centroid">

      <div class="btn-matrix">
        <button v-for="intent in intents" type="button" class="btn btn-outline-success" v-on:click='setValue(intent)'>{{intent}}</button>
      </div>

    </div>
    <div class="centroid">
      <form class="form-inline">
        <input type="text" id="intent_value" class="form-control" id="inputPassword2" placeholder="new_intent_name">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import * as T from "../types/common";

  @Component({
    name: "LinkComponent",
    props: {
      url: String,
      description: String
    }
  })
  export default class cLink extends Vue {
    link: T.Link = {url: "", description: "Link"};

    mounted() {
      this.link.url = this.$props.url || this.link.url;
      this.link.description = this.$props.description || this.link.description;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }
</style>
