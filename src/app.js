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
                value: 0
            }
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
          }
    }
  })
})