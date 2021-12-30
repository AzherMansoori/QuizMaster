import * as Constants from '../utils/Constants'
import { callApi } from './BaseModel'

export default class UserModel {
   static login(requestBody) {
      return callApi(Constants.METHOD_TYPE_POST, Constants.API_GET_CATEGORIES, requestBody)
   }
   static fetchCategory(requestBody) {
      return callApi(Constants.METHOD_TYPE_GET, Constants.API_GET_CATEGORIES, requestBody)
   }
}