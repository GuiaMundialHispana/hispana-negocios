<template>
  <div class="pb-[75px] 2xl:max-w-[1440px] mx-auto pt-16" id="loan">
    <h2 class="text-[28px] leading-[28px] font-semibold mb-12">Calculadora de préstamos</h2>
    <div class="grid lg:grid-cols-2 grid-cols-1">
      <form class="lg:border-r border-[#ECECEC] lg:pr-6">
        <div class="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div class="form-group">
            <label class="mb-2">Monto inicial</label>
            <div class="relative flex">
              <input type="number" class="form-control" v-model.lazy="initial">
              <span class="absolute right-0 bg-primary-100 text-neutral-white font-semibold text-sm p-2.5 rounded-tr-lg rounded-br-lg">{{initialPercentage}}%</span>
            </div>
          </div>
          <div class="form-group">
            <label class="mb-2">Cantidad de años</label>
            <div class="relative flex">
              <AtomsIcon name="general/calendar_month" :size=19 class="text-primary-100 absolute left-3 top-2.5" />
              <select class="form-control" v-model="years">
                <option value="10">10 años</option>
                <option value="20">20 años</option>
                <option value="30">30 años</option>
              </select>
              <AtomsIcon name="arrows/arrow-down" :size=16 class="text-primary-100 absolute right-3 top-3" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="mb-2">Tasa de interes %</label>
          <div class="relative">
            <AtomsIcon name="general/bank" :size=20 class="text-primary-100 absolute left-3 top-2.5" />
            <input type="number" class="form-control with-icon rounded-lg w-full pl-12" v-model.lazy="interest">
          </div>
        </div>
      </form>
      <div class="lg:pl-6 max-w-3xl lg:mt-0 mt-8">
        <div class="flex md:flex-row flex-col gap-6 md:items-center">
          <div class="flex-none">
            <label class="m-0">Monto inicial</label>
            <p class="text-bx"><b class="text-primary-100"> US${{ showParsedPrice(initial) }} |</b> {{ initialPercentage }}%</p>
          </div>
          <!--  -->
          <div class="progress">
            <div class="progress-status" :style="{width: initialPercentage + '%'}"></div>
          </div>
          <!--  -->
          <div class="flex-none">
            <label class="m-0">Monto del préstamo</label>
            <p class="text-bx"><b class="text-primary-100"> US${{ showParsedPrice(loanAmount) }} |</b> {{ loanPercentage }}%</p>
          </div>
        </div>
        <hr class="border-[#ECECEC] my-4">
        <div class="flex md:flex-row flex-col md:items-center md:justify-end">
          <div class="md:mb-0 mb-4">
            <label class="m-0">Cuota mensual estimada</label>
            <p class="text-[28px] text-primary-100 font-semibold md:text-right"> US${{ showParsedPrice(monthlyPayment) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        initial: 0,
        loanAmount: 0,
        years: 10,
        interest: 15,
        monthlyPayment: 0,
        initialPercentage: 0,
        loanPercentage: 0,
      }
    },
    props: {
      property: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      calculateEstimatedQuota(interest, initial, years, total) {
        const amount = total - initial;
        const month = years * 12;
        const monthlyRate = interest / 100 / 12;
        const quote = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -month));
        this.monthlyPayment = quote.toFixed(2)
      },
      getPercentage(initial, price){
        let initialPercent = (initial / price) * 100;
        let loanPercent = ((price - initial) / price) * 100;
        this.loanAmount = (price - initial).toFixed(2);
        this.initialPercentage = initialPercent.toFixed(2);
        this.loanPercentage = loanPercent.toFixed(2);
      },
      showParsedPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      
    },
    watch: {
      initial(){
        if (this.initial < 0) {
          this.initial = 0;
        } else {
            if (this.initial >= this.property.price_us) {
            this.initial = this.property.price_us - (this.property.price_us * 0.05)
          };
          this.getPercentage(this.initial, this.property.price_us);
          this.calculateEstimatedQuota(this.interest, this.initial, this.years,this.property.price_us )
          }
      },
      years(){
        this.calculateEstimatedQuota(this.interest, this.initial, this.years,this.property.price_us )
      },
      interest(){
        if (this.interest <= 0) {
          this.interest = 1;
        }
        this.calculateEstimatedQuota(this.interest, this.initial, this.years,this.property.price_us )
      },
    },
    
}
</script>
<style lang="postcss" scoped>
label {
  @apply text-sm text-neutral-black font-normal block;
}

.form-control {
  @apply flex-grow border-2 border-[#ECECEC] flex items-center rounded-tl-lg rounded-bl-lg pl-2.5 text-sm text-neutral-black h-10 font-medium focus:outline-secondary-100;

  &.with-icon { @apply px-12; }
}

select.form-control { @apply rounded-lg pl-11 appearance-none; }

.progress {
  @apply w-full h-1.5 bg-gray-300 rounded-lg overflow-hidden;
  & .progress-status { @apply bg-primary-100 h-full rounded-r-lg; }
}

.btn { @apply rounded-lg !important; }
</style>