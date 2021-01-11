

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


Vue.component('calculator', {
  template:`
    <div class="form">
      <div class="input-group">
        <input class='form-control' type ="number" id="entry" name="entry" v-model="input" @change="calculate" @keyup="calculate">
        <select class='form-control' style="width: 50px;" id="currency1" v-model="currency1" @change="calculate" v-select2>
          <option v-for="(currency, index) in currencies" :value='index'>{{ currency.initials }} </option>
        </select>
      </div>

      <ul>
        <li> {{ currencies[currency1].name }}  1 = {{currencies[currency2].initials}} {{currencies[currency1]["value_" + currencies[currency2].initials.toLowerCase()]}} </li>
        <li v-for="tax in taxes">{{ tax.taxName }} = {{ tax.taxValue }}%</li>
      </ul>

      <div class="input-group">
        <input class='form-control' type ="number" id="result" name="result" :value='output'>
        <select class='form-select' id="currency2" v-model="currency2" @change="calculate" v-select2>
          <option v-for="(currency, index) in currencies" :value='index'>{{ currency.initials }}</option>
        </select>
      </div>
      
    </div>`,
  data() {
    return {
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
          id: 1,
          flag: "./assets/imgs/brazil.svg",
          initials: "BRL",
          name: "Real Brasileiro",
          value_eur: 0.1563,
          value_usd: 0.1917
        },
        {
          id: 2,
          flag: "./assets/imgs/united-states.svg",
          initials: "USD",
          name: "Dólar Americano",
          value_brl: 5.2164,
          value_eur: 0.8192
        },
        {
          id: 3,
          flag: "./assets/imgs/european-union.svg",
          initials: "EUR",
          name: "Euro",
          value_brl: 6.3970,
          value_usd: 1.2206
        }
      ],
      currency1: 0,
      currency2: 1,
      input: 1000,
      output: 0
    };
  },
  methods: {
    selectValue(){
      console.log(this.selectedCurrency);
    },
    calculate(){
      if (this.currency1 == this.currency2)
        this.currency2 = this.checkSameCurrency(this.currency1, this.currency2)
      $("#currency2").val(this.currency2).trigger("change.select2")
      value =  this.currencies[this.currency1]["value_" + this.currencies[[this.currency2]].initials.toLowerCase()]
      iof = this.taxes[0].taxValue / 100 * this.input
      tax = this.taxes[1].taxValue / 100 * this.input
      this.output = (this.input - (iof+ tax)) * value
      this.output = this.output.toFixed(2)
    },
    checkSameCurrency(c1,c2){
      if (c1 == c2 && c1 >= 0 && c1 < 2){
        c2 +=1
        return c2
      }else {
        c2 -=1
        return c2
      }
    }
  }
})

var calc = new Vue({
  el: '#calc',

})

function formatCurrency (currency) {
  if (!currency.id) {
    return currency.text;
  }
  var img = calc.$refs.calc.currencies[currency.id].flag
  var $currency = $(
    '<span><img src="' + img + '" class="img-flag" /> ' + currency.text + '</span>'
  );
  return $currency;
};

document.onload = calc.$refs.calc.calculate();

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