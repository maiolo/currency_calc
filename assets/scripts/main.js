// $(document).ready(function() {
//   $('.currency').select2();
// });

var calc = new Vue({
  el: '#calc',
  data: {
    taxes: [
      {
        taxName: "IOF",
        taxValue: 1.1
      },
      {
        taxName:"Taxa de Administração",
        taxValue: 1
      }
    ],

    currencies: [
      {
        flag: "../imgs/brazil.svg",
        initials: "BRL",
        name: "Real Brasileiro",
        selected: "true"
      },
      {
        flag: "../imgs/united-states.svg",
        initials: "USD",
        name: "Dólar Americano"
      },
      {
        flag: "../imgs/european-union.svg",
        initials: "EUR",
        name: "Euro"
      }
    ],
    currency1: 0,
    currency2: 1,
    input: 0,
    output: 0
  },
  methods: {
    selectValue(){
      console.log(this.selectedCurrency);
    },
    calculate(){
      // this.output = this.input
      switch(this.currency1) {
        case 0:
          {
            switch(this.currency2) {
              case 0:
                this.currency2 = 1
                this.calculate()
                break;
              case 1:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 0.1917
                  this.output = this.output.toFixed(2)
                  break;
                }
              case 3:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 0.1563
                  this.output = this.output.toFixed(2)
                  break;
                }
            }
            break;
          }
        case 1:
          {
            switch(this.currency2) {
              case 0:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 5.2164
                  this.output = this.output.toFixed(2)
                  break;
                }
              case 1:
                this.currency2 = 0
                this.calculate()
                break;
              case 2:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 0.8192
                  this.output = this.output.toFixed(2)
                  break;
                }
              }
              break;
            }
          case 2:
            {
            switch(this.currency2) {
              case 0:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 6.3970
                  this.output = this.output.toFixed(2)
                  break;
                }
              case 1:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 1.2206
                  this.output = this.output.toFixed(2)
                  break;
                }
              case 2:
                this.currency2 = 1
                this.calculate()
                break;
            }
            break;
          }
      }
    }
  }
})