import Vue from 'vue';

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
        conversionResult: 10
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
            } else {
                total = (amount / rate).toFixed(2);
                result = `${amount} ${this.selectedConversion.currency.key} is ${total} Euros`
            }
            this.conversionResult = result;
            console.log(this.conversionResult);
        }
    }
  })
})