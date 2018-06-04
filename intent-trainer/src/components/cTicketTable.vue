<template>

  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-input style="width: 400px" placeholder="Search by description/subject/ticket number"></el-input>
        </el-col>
        <el-col :span="12">
          <el-button @click="previousPage">Previous</el-button>
          <el-button @click="firstPage">First</el-button>
          <el-button @click="refreshPage">Refresh</el-button>
          <el-button @click="lastPage">Last</el-button>
          <el-button @click="nextPage">Next</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-table :data="this.$store.state.tickets">

            <el-table-column
              fixed
              width="400"
              prop="description"
              label="Description">
            </el-table-column>

            <el-table-column
              prop="subject"
              label="Subject"
              width="250">
            </el-table-column>


            <el-table-column width="250"
                             prop="predicted_intent.intent_name"
                             label="Predicted intent">
            </el-table-column>

            <el-table-column width="180"
                             prop="corrected_intent.intent_name"
                             label="Corrected intent">
            </el-table-column>


            <el-table-column
              prop="confidence"
              label="Confidence"
              width="100">
            </el-table-column>

            <el-table-column
              prop="created_at"
              label="Date"
              :formatter="formatDateAsIst"
              width="200">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="Operations"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="markAsCorrect(scope.row)">Correct
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="intentCorrectionPage(scope.row)">Wrong
                </el-button>

              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </el-main>



  </el-container>


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
        size: this.$store.state.ticketPagination.size
      });
      this.$store.commit("refreshTickets");
    }

    refreshPage() {
      this.$store.commit("refreshTickets");
    }

    filterPredictedHandler() {
      console.log("filter predicted handler", arguments);
    }


    nextPage() {
      this.$store.commit("setPage", {
        number: this.$store.state.ticketPagination.number + 1,
        size: this.$store.state.ticketPagination.size
      });
      this.$store.commit("refreshTickets");
    }

    lastPage() {
      this.$store.commit("setPage", {
        number: this.$store.state.ticketPagination.lastPage,
        size: this.$store.state.ticketPagination.size
      });
      this.$store.commit("refreshTickets");
    }

    previousPage() {
      if (this.$store.state.ticketPagination.number < 2) {
        return
      }
      this.$store.commit("setPage", {
        number: this.$store.state.ticketPagination.number - 1,
        size: this.$store.state.ticketPagination.size
      });
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

    formatDateAsIst(row: any, column: any, createdAt: string, index: any) {
      let indianDate = new Date(new Date(createdAt).getTime() + 330 * 60000);
      let finalTimeString = indianDate.toDateString() + "\n" + indianDate.toTimeString().split(" ")[0];

      return finalTimeString;
    }

    markAsCorrect(ticket: Ticket) {
      console.log("mark as correct", arguments);
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
