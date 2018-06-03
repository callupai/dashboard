<template>
  <div class="container">
    <div>
      Page: {{this.$store.state.ticketPagination.number}}
      <el-button @click="previousPage">Previous page</el-button>
      <el-button @click="firstPage">First page</el-button>
      <el-button @click="nextPage">Next page</el-button>
    </div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th></th>
        <th>Ticket Id</th>
        <th>Created at</th>
        <th>Subject</th>
        <th>Description</th>
        <th>Predict Intent</th>
        <th>Correct Intent</th>
        <th>Confidence</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in this.$store.state.tickets" v-if="ticket">
        <td>
          <button type="button" class="btn btn-danger" v-on:click='intentCorrectionPage(ticket)'>Wrong</button>
        </td>
        <td>{{ticket.merchant_ticket_number}}</td>
        <td>{{ticket.created_at}}</td>
        <td>{{ticket.subject}}</td>
        <td>{{ticket.description}}</td>
        <td>{{ticket.predicted_intent ? ticket.predicted_intent.intent_name : ""}}</td>
        <td>{{ticket.corrected_intent ? ticket.corrected_intent.intent_name : ""}}</td>
        <td>{{ticket.confidence}}%</td>
        <td>
          <button type="button" class="btn btn-success" v-on:click='markAsCorrect(ticket)'>Correct</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {RawLocation} from "vue-router";
  import {Ticket} from "../store/store";

  @Component({
    // components: {cLink}
  })
  export default class cHello extends Vue {
    snackbar_tkt: string = "";


    firstPage() {
      this.$store.commit("setPage", {
        number: 1,
        size: 20
      })
      this.$store.commit("refreshTickets");
    }


    nextPage() {
      this.$store.commit("setPage", {
        number: this.$store.state.ticketPagination.number + 1,
        size: 20
      })
      this.$store.commit("refreshTickets");
    }

    previousPage() {
      if (this.$store.state.ticketPagination.number < 2) {
        return
      }
      this.$store.commit("setPage", {
        number: this.$store.state.ticketPagination.number - 1,
        size: 20
      })
      this.$store.commit("refreshTickets");
    }

    onClick(): void {
      console.log("a non-vuex method has been called");
    }

    intentCorrectionPage(ticket: Ticket) {
      this.$router.push({
        name: "MarkCorrectIntent",
        params: {
          ticket_id: ticket.reference_id as string
        }
      } as RawLocation);
    }

    markAsCorrect(ticket: Ticket) {
      const that = this;
      that.$store.state.client.jsonApi.update("ticket", {
        id: ticket.reference_id,
        corrected_intent: ticket.predicted_intent,
      }).then(function (res: any) {
        console.log("update ticket response", res);
        that.$store.commit("refreshTickets");
      });
    }

    showSnackbar(ticket_id: string) {
      this.snackbar_tkt = ticket_id;
      // Get the snackbar DIV
      const x: any = document.getElementById("snackbar");
      // Add the "show" class to DIV
      x.className = "show";
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
