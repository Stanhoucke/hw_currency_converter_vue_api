import Vue from 'vue';

Vue.filter('instructions', function(value){
    value = "Click convert when you are ready to convert currencies.";
    return value;
})

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
        rates: [],
        selectedConversion: {
            type: null,
            amount: 0,
            currency: {
                key: "",
                rate: 0
            }
        },
        conversionResult: null,
        crossCurrency: {
            key: "",
            rate: 0
        }
    },
    mounted: function () {
        this.fetchRates()
    },
    methods: {
        fetchRates: function(){
            fetch("https://api.exchangeratesapi.io/latest")
            .then( response => response.json() )
            .then( data => this.rates = data.rates )
        },
        convert: function(){
            let result;
            let total;
            let amount = this.selectedConversion.amount;
            let rate = this.selectedConversion.currency.rate;
            if (this.selectedConversion.type === "from") {
                total = (amount * rate).toFixed(2);
                result = `${amount} Euros is ${total} ${this.selectedConversion.currency.key}`;
            } else if (this.selectedConversion.type === "to") {
                total = (amount / rate).toFixed(2);
                result = `${amount} ${this.selectedConversion.currency.key} is ${total} Euros`;
            } else {
                // From currency A to B
                // Convert A to Euros
                let toEuros = amount / this.crossCurrency.rate;
                // Convert Euros to B
                total = (toEuros * rate).toFixed(2);
                // assign result
                result = `${amount} ${this.crossCurrency.key} is ${total} ${this.selectedConversion.currency.key}`;
            }
            this.conversionResult = result;
        }
    }
  })
})