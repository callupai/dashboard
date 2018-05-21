<template>
  <div class="container">
    <!--<h2>Hoverable Dark Table</h2>-->
    <!--<p>The .table-hover class adds a hover effect (grey background color) on table rows:</p>-->
    <table class="table table-hover">
      <thead>
      <tr>
        <th></th>
        <th>Ticket Id</th>
        <th>Category</th>
        <th>Description</th>
        <th>Predict Intent</th>
        <th>Correct Intent</th>
        <th>Confidence</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in this.$store.state.tickets">
        <td>
          <button type="button" class="btn btn-danger" v-on:click='intentCorrectionPage(ticket)'>Wrong</button>
        </td>
        <td>{{ticket.merchant_ticket_number}}</td>
        <td>{{ticket.category}}</td>
        <td>{{ticket.description}}</td>
        <td>{{ticket.predicted_intent}}</td>
        <td>{{ticket.corrected_intent}}</td>
        <td>{{ticket.confidence}}%</td>
        <td>
          <button type="button" class="btn btn-success" v-on:click='showSnackbar(ticket.merchant_ticket_number)'>Correct</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    // components: {cLink}
  })
  export default class cHello extends Vue {
    snackbar_tkt: string = "";


    onClick(): void {
      console.log("a non-vuex method has been called");
    }

    intentCorrectionPage(ticket: any) {
      this.$router.push('mark_correct_intent/' + ticket.reference_id);
      // location.href = 'intent-correction.html' + '?description=' + ticket.attributes.description;
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
