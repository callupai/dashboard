<template>

  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-select v-model="filterColumn" placeholder="Column filter">
            <el-option
              v-for="item in filterColumnOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"></el-option>
          </el-select>

          <el-input @change="searchResults" v-model="query" style="width: 300px" placeholder="Search by description/subject/ticket number"></el-input>
          <el-button @click="searchResults">Search</el-button>
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
              sortable
              width="250">
            </el-table-column>


            <el-table-column width="250"
                             prop="predicted_intent.intent_name"
                             sortable
                             label="Predicted intent">
            </el-table-column>

            <el-table-column width="180"
                             prop="corrected_intent.intent_name"
                             sortable
                             label="Corrected intent">
            </el-table-column>


            <el-table-column
              prop="confidence"
              label="Confidence"
              sortable
              width="100">
            </el-table-column>


            <el-table-column
              prop="merchant_ticket_number"
              label="Ticket #"
              width="150">
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
    query: string = "";
    filterColumn: string = "";
    filterColumnOptions: any[] = [
      {
        name: "Description",
        value: "description"
      },
      {
        name: "Subject",
        value: "subject"
      },
      {
        name: "Ticket #",
        value: "merchant_ticket_id"
      },
    ];

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

    searchResults() {
      console.log("search query", this.query);
      if (this.query && this.query.length > 0) {
        this.$store.commit("setQuery", [{
            column: this.filterColumn,
            operator: "contains",
            value: this.query
          }]
        );
      } else {
        this.$store.commit("setQuery", []);
      }
      this.$store.commit("refreshTickets")
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
      let indianDate = new Date(new Date(createdAt).getTime());
      let finalTimeString = indianDate.toDateString().split("2018")[0] + indianDate.toTimeString().split(" ")[0];

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
