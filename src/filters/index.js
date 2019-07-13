import Vue from 'vue'
//import moment from 'moment'  date-fns包小
import formate from 'date-fns/format'

Vue.filter('date_format',function(value,formatStr='YYYY-MM-DD HH:mm:ss'){
   /*  return  moment(value).format(formatStr) */
    return formate(value,formatStr)
})