import api from '../lib/axios';
import {auth} from '../services/firebase'

export default {
  init () {
         api.interceptors.request.use(async config => {
           config.headers.authtoken = await auth.currentUser?.getIdToken()
           return config
          }, (error) => {
           return Promise.reject(error)
          })
        }
    }