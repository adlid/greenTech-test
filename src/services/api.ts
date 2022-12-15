import axios from "axios";
import {PlanItems} from "../models/PlanItems";


const REST_URL = "https://virtserver.swaggerhub.com/LOL11999333/Planner/1.0.0/"
 const instance =  axios.create({
    baseURL: REST_URL
})

export const servicesAPI = {
    plannerItemsAPI:{
        findAllForecastPlanerItems(){
            return instance.get<PlanItems[]>('findAllForecastPlanerItems').then(value=>value.data)
        },
        deleteForecastPlannerItemById(id:string){
            return instance.get<any>(`deleteForecastPlannerItemById?itemId=${id}`).then(value=>value.data)
        },
        addNewForecastPlannerItem(dateOfSend:string,forecastStart:string,forecastEnd:string){
            return instance.get<any>(`addNewForecastPlannerItem?dateOfSend=${dateOfSend}&forecastStart=${forecastStart}&forecastEnd=${forecastEnd}`).then(value=>value)
        },
    }
}
