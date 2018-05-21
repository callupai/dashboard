<template>
  <div>
    <div style="text-align: center; padding-top: 30px;">
      What is the correct intent?
      <br/>
      <h4>{{this.ticket.description}}</h4>
    </div>
    <div class="centroid">

      <div class="btn-matrix">
        <button v-for="intent in this.$store.state.intents" type="button" class="btn btn-outline-success" v-on:click='setValue(intent)'>
          {{intent}}
        </button>
      </div>

    </div>
    <div class="centroid">
      <form class="form-inline">
        <input type="text" id="intent_value" class="form-control" placeholder="new_intent_name">
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Ticket} from "../store/store";

  @Component({
    name: "LinkComponent",
    props: {
      description: String
    }
  })
  export default class cLink extends Vue {
    ticketId: string = "";
    ticket: Ticket = {} as Ticket;
    mounted() {
      const that = this;
      this.ticketId = this.$route.params.ticket_id;
      console.log("loaded mark correct intent", this.ticketId, this.$store.state);
      this.$store.state.client.jsonApi.find("ticket", this.ticketId).then(function(res: any){
        that.ticket = res.data;
        console.log("loaded ticket", res.data);
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }
</style>
