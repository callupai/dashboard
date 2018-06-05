import Vue from 'vue'
import Vuex, {ActionTree, MutationTree} from 'vuex'
import * as T from '../types/common'
import {DaptinClient} from 'daptin-client'

Vue.use(Vuex);


export interface Ticket {
  confidence: String,
  description: String,
  merchant_id: String,
  merchant_ticket_number: String,
  permission: String,
  predicted_intent: String,
  reference_id: String,
  support_ticket_number: String,
  user_id: String,
  corrected_intent: Boolean
  created_at: Date,
  updated_at: Date,
}

export interface Intent {
  intent_name: String,
  confidence: String,
  permission: String,
  user_id: String,
  reference_id: String,
  created_at: Date,
  updated_at: Date,
}

export interface UserAccount {
  email: String,
  password: String,
  token: String,
}

export interface Pagination {
  number: number,
  size: number
  lastPage: number,
}

let token: any = window.localStorage.getItem("token");

const daptinClient = new DaptinClient("http://dashboard.callup.ai:8080", false);
daptinClient.worldManager.loadModels().then(function () {

  if (token) {
    daptinClient.jsonApi.findAll("ticket", {
      included_relations: "intent",
      page: state.ticketPagination,
      sort: "-created_at"
    }).then(function (res: any) {
      console.log("all tickets", res.data, arguments);
      state.tickets = res.data;
      state.ticketPagination.lastPage = res.links.last_page
    });

    daptinClient.jsonApi.findAll("intent", {
      page: {
        size: 500,
        number: 1
      }
    }).then(function (res: any) {
      console.log("all intents", res.data);
      state.intents = res.data;
    });
  }
});

interface ColumnQuery {
  column: string,
  operator: string,
  value: string
}

interface Query {
  query: string
}

interface State {
  links: T.Link[],
  tickets: Ticket[],
  intents: Intent[],
  client: DaptinClient,
  user: UserAccount,
  ticketPagination: Pagination,
  ticketStats: any,
  query: ColumnQuery[],
  dates: string[]
  statsByDates: any
}

const mutations: MutationTree<State> = {
  reverse: (state) => state.links.reverse(),
  logout: (state) => {
    state.user = {} as UserAccount;
  },
  refreshStats: (state) => {
    if (state.user.token) {


      daptinClient.statsManager.getStats("intent", {
        group: "id,intent_name"
      }).then(function(res: any){
        console.log("intent array", res.data);
        const intentMap = {};
        res.data.map(function(intent){
          intentMap[intent.id] = intent.intent_name
        });
        console.log("intent map", intentMap);

        const dates : string[] = [];
        const tablesByDate = {};

        daptinClient.statsManager.getStats("ticket", {
          group: "date(created_at),subject,predicted_intent,corrected_intent",
          column: "count(*)"
        }).then(function (res: any) {
          console.log("Stats resolved", res);
          state.ticketStats = res.data;
          state.ticketStats.map(function(stat) {
            const date = stat["date(created_at)"];
            if (dates.indexOf(date) == -1) {
              dates.push(date);
              tablesByDate[date] = {date: date, data: []}
            }
            stat.predicted_intent = intentMap[stat.predicted_intent];
            stat.corrected_intent = intentMap[stat.corrected_intent];
            tablesByDate[date].data.push(stat)
          });
          dates.sort();
          dates.reverse();
          console.log("dates", dates);
          state.statsByDates = tablesByDate;
          state.dates = dates;
        });


      });


    }
  },
  refreshTickets: (state) => {
    if (state.user.token) {

      daptinClient.jsonApi.findAll("ticket", {
        included_relations: "intent",
        page: state.ticketPagination,
        sort: "-created_at",
        query: JSON.stringify(state.query)
      }).then(function (res: any) {
        console.log("all tickets", res.data);
        state.tickets = res.data;
      });

    }
  },
  setQuery: (state, query: ColumnQuery[]) => {
    state.query = query;
  },
  refreshIntents: (state) => {
    if (state.user.token) {
      daptinClient.jsonApi.findAll("intent", {
        page: {
          size: 500,
          number: 1
        }
      }).then(function (res: any) {
        console.log("all intents", res.data);
        state.intents = res.data;
      });
    }
  },
  setPage: (state, page) => {
    console.log("set page", page);
    state.ticketPagination = page;
  }
};

const actions: ActionTree<State, any> = {};

const state: State = {
  links: [] as T.Link[],
  tickets: [] as Ticket[],
  intents: [] as Intent[],
  client: daptinClient,
  user: {
    token: token
  } as UserAccount,
  ticketPagination: {
    size: 20,
    number: 1
  } as Pagination,
  ticketStats: [],
  query: [] as ColumnQuery[],
  statsByDates: {},
  dates: []
};

export default new Vuex.Store<State>({
  state,
  mutations,
  actions
});



