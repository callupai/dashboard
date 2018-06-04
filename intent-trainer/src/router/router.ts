import Vue from 'vue'
import Router, {RouterOptions} from 'vue-router'
import cTicketTable from '../components/cTicketTable.vue'
import cMarkCorrectIntent from '../components/cMarkCorrectIntent.vue'
import cTicketStats from '../components/cTicketStats.vue'

Vue.use(Router);

const routerOptions: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'TicketTable',
      component: cTicketTable
    },
    {
      path: '/mark_correct_intent/:ticket_id',
      name: 'MarkCorrectIntent',
      component: cMarkCorrectIntent,
      props: true
    },
    {
      path: '/ticket/stats',
      name: 'TicketStats',
      component: cTicketStats,
      props: true
    }
  ]
};

export default new Router(
  routerOptions
)
