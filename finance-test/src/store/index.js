import { createStore, createLogger } from 'vuex'
import modal from './modules/modal'
const debug = process.env.NODE_ENV !== 'production'

const store =  createStore({
  modules:
  {
    modal
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store