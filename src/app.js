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
            if (this.selectedConversion.type === "from") {
                this.conversionResult = (this.selectedConversion.amount * this.selectedConversion.currency.rate).toFixed(2);
            } else {
                this.conversionResult = (this.selectedConversion.amount / this.selectedConversion.currency.rate).toFixed(2);
            }
            console.log(this.conversionResult);
        }
    }
  })
})