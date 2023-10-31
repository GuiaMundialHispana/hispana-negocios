<template>
  <h2 class="text-[28px] font-medium w-full border-b border-b-[#EBEBEB7D] py-8 px-16">Estadísticas del perfil</h2>
  <div class="flex w-full flex-col lg:flex-row">
    <div class="w-full lg:w-1/2 pb-24">
      <h3 class="text-[32px] font-normal text-center lg:text-start text-secondary-100 px-16 py-14">{{ slug }}</h3>
      <div class="bg-neutral-10 sm:h-[456px] sm:w-[456px] h-[250px] w-[250px] rounded-full mx-auto flex items-center justify-center"
        :style="{background: 'repeating-conic-gradient('+changeChartColors+')'}">
        <span class="rounded-full sm:w-[280px] sm:h-[280px] w-[160px] h-[160px] bg-neutral-white flex items-center justify-center flex-col text-sm gap-2.5"> 
          Visitas totales
          <span class="bg-primary-100 text-neutral-white px-4 py-2.5 rounded-lg sm:text-2xl">
            {{ formatNumber(totalVisits) }}
          </span>
        </span>
    </div>
    </div> 
    <div class="bg-[#EBEBEB7D] w-full lg:w-1/2 flex flex-col items-center justify-center">
      <div class="px-8 py-20">
        <h3 class="text-2xl">Leads generados</h3>
        <div class="border-2 sm:w-[550px] xl:w-[550px] lg:w-[400px] flex mx-auto mt-5 rounded-xl overflow-hidden border-neutral-20 text-sm bg-neutral-white">
          <table class="w-full">
            <tr v-for="visit in visits" :key="visit" class="border-b-2 last:border-none border-neutral-20 [*&>td]:px-4 [*&>td]:py-2.5">
              <td>{{ visit.source }}</td>
              <td>
                <span class="block w-4 h-4 rounded-full ml-auto mr-3" :style="{backgroundColor: visit.chartColor}"></span>
              </td>
              <td class="bg-neutral-10 text-center">{{ visit.visitsCount }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

  
</template>
<script>
export default {
  name: 'Advertisement',
  data() {
    return {
      result: null,
      totalVisits: 0,
      visits: [
        {
          source: "Visitas al perfil",
          chartColor: "#293451",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "Facebook",
          chartColor: "#3d5490",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "Instagram",
          chartColor: "#4566b0",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "WhatsApp",
          chartColor: "#6391ce",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "Página Web",
          chartColor: "#81acd9",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "Ubicación",
          chartColor: "#aac9e6",
          visitsCount: 0,
          visitPercent:0
        },
        {
          source: "Teléfono Fijo",
          chartColor: "#ccdef1",
          visitsCount: 0,
          visitPercent:0
        }
      ],
      id: null,
      slug: ''
    }
  },
  computed: {
    changeChartColors() {
      return ` #293451 0deg calc(3.6deg * ${this.visits[0].visitPercent}), #3d5490 calc(3.6deg * ${this.visits[0].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent}), #4566b0 calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent}), #6391ce calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent}), #81acd9 calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent+this.visits[4].visitPercent}), #aac9e6 calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent+this.visits[4].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent+this.visits[4].visitPercent+this.visits[5].visitPercent}), #ccdef1 calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent+this.visits[4].visitPercent}) calc(3.6deg * ${this.visits[0].visitPercent+this.visits[1].visitPercent+this.visits[2].visitPercent+this.visits[3].visitPercent+this.visits[4].visitPercent+this.visits[5].visitPercent+this.visits[6].visitPercent}`
    },
  },
  methods: {
    getTotalVisits(){
      let index = 0;
      for (let key in this.result) {
        if (index > 1) {
          if (index < 9) {
            this.totalVisits += this.result[key],
            this.visits[index - 2].visitsCount = this.result[key]
          }
        }
        index++      
      }
      this.visits[0].visitPercent = ((this.result["profile_views"] / this.totalVisits) * 100),
      this.visits[1].visitPercent = ((this.result.facebook / this.totalVisits) * 100),
      this.visits[2].visitPercent = ((this.result.instagram / this.totalVisits) * 100),
      this.visits[3].visitPercent = ((this.result.whatsApp / this.totalVisits) * 100),
      this.visits[4].visitPercent = ((this.result.web / this.totalVisits) * 100),
      this.visits[5].visitPercent = ((this.result.location / this.totalVisits) * 100),
      this.visits[6].visitPercent = ((this.result.phone / this.totalVisits) * 100)
    },
    formatNumber(number){
      return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getAds(id) {
      const { data } = useFetch(`statistics/${id}`, {
        method: 'GET',
        server: false,
        baseURL: useRuntimeConfig().public.API,
        onResponse({response}) {
          if(response.status === 200 ) {
            this.result = response._data.results;
            console.log(this.result)
            this.getTotalVisits();
          }
        },
      });
    }
  },
  mounted() {
    // this.getTotalVisits();
    this.id = useRoute().query.id;
    this.slug = useRoute().query.name;
    this.getAds(this.id);
  }
}
</script>
<style scoped>

</style>