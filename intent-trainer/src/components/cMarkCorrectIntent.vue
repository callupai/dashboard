<template>
  <div class="container-fluid">
    <div style="text-align: center; padding-top: 30px;">
      What is the correct intent?
      <br/>
      <h4>{{ticket.description}}</h4>
    </div>
    <div class="centroid">
      <div class="btn-matrix">
        <button v-for="intent in this.$store.state.intents" type="button" class="btn btn-outline-success" v-on:click='chooseIntent(intent)'>
          {{intent.intent_name}}
        </button>
      </div>
    </div>
    <div class="centroid">
      <el-form>
        <el-form-item>
          <el-input type="text" v-model:value="correctIntentName" id="intent_value" class="form-control" placeholder="correct intent">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setIntent">Update</el-button>
          <el-button type="danger" @click="cancelUpdate">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {Intent, Ticket} from "../store/store";
  import {RawLocation} from "vue-router";

  @Component({
    name: "LinkComponent",
  })
  export default class cLink extends Vue {
    ticketId: string = "";
    ticket: Ticket = {} as Ticket;
    correctIntent: Intent = {} as Intent;
    correctIntentName: String = "";

    chooseIntent(intent: Intent) {
//      this.correctIntent = intent;
      this.correctIntentName = intent.intent_name
    }

    cancelUpdate() {
      this.$router.push({
        name: 'TicketTable',
      } as RawLocation);
    }

    alterIntent(intent: Intent){
      const that = this;
      console.log("choosen Intent object");
      console.log(intent);
      that.correctIntent = intent;
      console.log("todo intent patch call with correctIntent");
      console.log("update on server");
      that.$store.state.client.jsonApi.update("ticket", {
        id: that.$route.params.ticket_id,
        corrected_intent: that.correctIntent,
      }).then(function (res: any) {
        console.log("update ticket response", res);
        that.$store.commit("refreshTickets");
        that.$router.push({
            name: 'TicketTable',
          } as RawLocation);
      });
    }

    setIntent() {
      const that = this;
      for(let intent of that.$store.state.intents){
        console.log("intents:"+intent.intent_name+"\n");
        if(this.correctIntentName == intent.intent_name){
          that.alterIntent(intent);
          return
        }
      }
      console.log("this looks like a new intent to me :)");
      that.$store.state.client.jsonApi.create("intent", {"intent_name":that.correctIntentName}
      ).then(function (res: any) {
        console.log("new intent creation response", res);
        that.alterIntent(res.data);
        that.$store.commit("refreshIntents");

      });

    }


    mounted() {
      const that = this;
      this.ticketId = this.$route.params.ticket_id;
      console.log("loaded mark correct intent", this.ticketId, this.$store.state);
      this.$store.state.client.jsonApi.find("ticket", this.ticketId, {
        included_relations: "intent"
      }).then(function (res: any) {
        console.log(res.data);
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

  .el-select .el-input {
    width: 110px;
  }
</style>
