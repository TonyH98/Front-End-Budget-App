import FusionCharts from "fusioncharts"
import ReactFC from "react-fusioncharts"
import pie2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"


import { useState , useEffect} from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL


ReactFC.fcRoot(FusionCharts, pie2D, FusionTheme);





function TransactionChart(){
    // const category = ["Income" , "Taxes", "Eduction", "Insurance", "House", "Kids", "Entertainment", "Pets", "Car", "Groceries", "Other"]
     const [transaction , setTransaction] = useState([])



    useEffect(()=> {
        axios.get(`${API}/transaction`)
        .then((res) => setTransaction(res.data))
        .catch(err => console.log(err))
      }, [])

function getByCategory(data){
    const filter = transaction.filter((x) => {
        return(

            x.category === data
        )
    })
    return filter

}
    

// const category = ["Income" , "Taxes", "Eduction", "Insurance", "House", "Kids", "Entertainment", "Pets", "Car", "Groceries", "Other"]

let income = 0

getByCategory("Income").forEach((x) => {
    income += x.amount
})


let taxes = 0

getByCategory("Taxes").forEach((x) => {
    taxes += Math.abs(x.amount)
})


let education = 0

getByCategory("Eduction").forEach((x) => {
    education += Math.abs(x.amount)
})

let insurance = 0

getByCategory("Insurance").forEach((x) => {
    insurance += Math.abs(x.amount)
})

let house = 0

getByCategory("House").forEach((x) => {
    house += Math.abs(x.amount)
})

let kids = 0

getByCategory("Kids").forEach((x) => {
    kids += Math.abs(x.amount)
})

let entertainment = 0

getByCategory("Entertainment").forEach((x) => {
    entertainment += Math.abs(x.amount)
})

let pets = 0

getByCategory("Pets").forEach((x) => {
    pets += Math.abs(x.amount)
})



let car = 0

getByCategory("Car").forEach((x) => {
    car += Math.abs(x.amount)
})

let groceries = 0

getByCategory("groceries").forEach((x) => {
    groceries += Math.abs(x.amount)
})

let other = 0

getByCategory("Other").forEach((x) => {
    other += Math.abs(x.amount)
})

    const chartConfigs = {
      type: "pie2d",
      width: "700", 
      height: "400",
      dataFormat: "json", 
      dataSource: {
        chart: {
          caption: "Expenditures base on category",    
          xAxisName: "Category",
          yAxisName: "Money",
          
          theme: "fusion"                
        },

       
            

        data:[
            {label: 'Income', value: income},
            {label: "Taxes" , value: taxes},
            {label: "Education", value: education},
            {label: "Insurance", value: insurance},
            {label: "House", value: house},
            {label: "Kids", value: kids},
            {label: "Entertainment", value: entertainment},
            {label: "Pets", value: pets},
            {label: "Car", value: car},
            {label: "Groceries", value: groceries},
            {label: "Other", value: other}
        ]
      }
    };


    return(
        <div>
            <ReactFC {...chartConfigs} />
        </div>
    )
}

export default TransactionChart