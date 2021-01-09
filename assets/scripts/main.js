
Vue.directive('select2', {
  inserted(el) {
      $(el).on('select2:select', () => {
          const event = new Event('change', { bubbles: true, cancelable: true });
          el.dispatchEvent(event);
      });

      $(el).on('select2:unselect', () => {
          const event = new Event('change', {bubbles: true, cancelable: true})
          el.dispatchEvent(event)
      })
  },
});

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
        flag: "./assets/imgs/brazil.svg",
        initials: "BRL",
        name: "Real Brasileiro",
      },
      {
        flag: "./assets/imgs/united-states.svg",
        initials: "USD",
        name: "Dólar Americano"
      },
      {
        flag: "./assets/imgs/european-union.svg",
        initials: "EUR",
        name: "Euro"
      }
    ],
    currency1: 0,
    currency2: 1,
    input: 0.00,
    output: 0.00
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
                $("#currency2").val(this.currency2).trigger("change.select2")
                break;
              case 1:
                {
                  this.output = (this.input - ((this.taxes[0].taxValue / 100 * this.input) + (this.taxes[1].taxValue / 100 * this.input))) * 0.1917
                  this.output = this.output.toFixed(2)
                  break;
                }
              case 2:
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
                $("#currency2").val(this.currency2).trigger("change.select2")
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
                $("#currency2").val(this.currency2).trigger("change.select2")
                break;
            }
            break;
          }
      }
    },
  }
})

// function newFunction() {
//   $(document).ready(function () {
//     $('.currency').select2();
//   });
// }

function formatCurrency (currency) {
  if (!currency.id) {
    return currency.text;
  }
  var img = calc.currencies[currency.id].flag
  var $currency = $(
    '<span><img src="' + img + '" class="img-flag" /> ' + currency.text + '</span>'
  );
  return $currency;
};

$('#currency1').select2({
  theme: 'bootstrap4',
  minimumResultsForSearch: Infinity,
  templateResult: formatCurrency,
  templateSelection: formatCurrency
});
$('#currency2').select2({
  theme: 'bootstrap4',
  width: 'resolve',
  minimumResultsForSearch: Infinity,
  templateResult: formatCurrency,
  templateSelection: formatCurrency
});