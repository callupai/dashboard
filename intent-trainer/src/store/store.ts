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

const daptinClient = new DaptinClient("http://ec2-54-169-121-6.ap-southeast-1.compute.amazonaws.com:5679", false);
daptinClient.worldManager.loadModels().then(function () {

  daptinClient.jsonApi.findAll("intent").then(function (res: any) {
    console.log("all intents", res.data);
    state.intents = res.data;
    daptinClient.jsonApi.findAll("ticket", {
      included_relations: "intent"
    }).then(function (res: any) {
      console.log("all tickets", res.data);
      state.tickets = res.data;
    })
  })
});

interface State {
  links: T.Link[],
  tickets: Ticket[],
  intents: Intent[],
  client: DaptinClient,
}

const mutations: MutationTree<State> = {
  reverse: (state) => state.links.reverse(),
  refreshTickets: (state) => {
    daptinClient.worldManager.loadModel("ticket").then(function (response) {
      daptinClient.jsonApi.findAll("ticket").then(function (tickets: Ticket[]) {
        console.log("tickets", tickets);
        state.tickets = tickets;
      });
    })
  },
  refreshIntents: (state) => {
    daptinClient.worldManager.loadModel("intent").then(function (response) {
      daptinClient.jsonApi.findAll("intent").then(function (tickets: Intent[]) {
        console.log("intents", tickets);
        state.intents = tickets;
      });
    })
  }
};

const actions: ActionTree<State, any> = {};

const state: State = {
  links: [
    {url: "https://vuejs.org", description: "Core Docs"},
  ] as T.Link[],
  tickets: [] as Ticket[],
  intents: [] as Intent[],
  client: daptinClient
};

export default new Vuex.Store<State>({
  state,
  mutations,
  actions
});



