<template>
  <div class="bg-neutral-10 h-[450px] w-[450px] rounded-full mx-auto flex items-center justify-center"
  :style="{background: 'repeating-conic-gradient('+cambiarColor+')'}">
    <span class="rounded-full w-[300px] h-[300px] bg-neutral-white flex items-center justify-center">{{ totalVisits }}</span>
  </div>

  <div class="border-2 w-[550px] mx-auto mt-9 rounded-xl overflow-hidden border-neutral-20 text-sm">
    <table class="w-full">
      <tr v-for="(visits, index) in visitsStatistics" class="border-b-2 last:border-none border-neutral-20 [*&>td]:px-4 [*&>td]:py-2.5">
        <td>{{ visits.nombre }}</td>
        <td>
          <span class="block w-4 h-4 rounded-full ml-auto mr-3" :style="{backgroundColor: chartColors[index]}"></span>
        </td>
        <td class="bg-neutral-10 text-center">{{ visits.visitas }}</td>
      </tr>
    </table>
  </div>
      Estos son los valores que pintan:

      {{fbVisitPercent}}
      {{IgVisitPercent}}
      {{WsVisitPercent}}
      {{WebVisitPercent}}
      {{locVisitPercent}}
      {{telVisitPercent}}
</template>
<script>
export default {
  name: 'Advertisement',
  data() {
    return {
      visitsStatistics: [
      {
        nombre: "Facebook",
        visitas: 500,
      },
      {
        nombre: "Instagram",
        visitas: 600
      },
      {
        nombre: "WhatsApp",
        visitas: 350
      },
      {
        nombre: "Página Web",
        visitas: 450
      },
      {
        nombre: "Ubicación",
        visitas: 250
      },
      {
        nombre: "Teléfono Fijo",
        visitas: 700
      }
      ],
      chartColors: ["#293451", "#3d5490", "#4566b0", "#6391ce", "#81acd9", "#aac9e6"],
      totalVisits: 0, //sumar las de los demas
      fbVisitPercent: 0,
      IgVisitPercent: 0,
      WsVisitPercent: 0,
      WebVisitPercent: 0,
      locVisitPercent: 0,
      telVisitPercent: 0,
    }
  },
  computed: {
    test() {
      return 'red'
    },
    getVisitsPercentage(){
      visitsStatistics.forEach(object => {
        return this.totalVisits += object.visitas;
      });
      // this.fbVisitPercent = (this.visitsStatistics[0].visitas / this.totalVisits) * 100,
      // this.IgVisitPercent = (this.visitsStatistics[1].visitas / this.totalVisits) * 100,
      // this.WsVisitPercent = (this.visitsStatistics[2].visitas / this.totalVisits) * 100,
      // this.WebVisitPercent = (this.visitsStatistics[3].visitas / this.totalVisits) * 100,
      // this.locVisitPercent = (this.visitsStatistics[4].visitas / this.totalVisits) * 100,
      // this.telVisitPercent = (this.visitsStatistics[5].visitas / this.totalVisits) * 100
    },
    cambiarColor() {
      return `#293451 0deg calc(3.6deg * ${this.fbVisitPercent}), #3d5490 calc(3.6deg * ${this.fbVisitPercent}) calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent}), #4566b0 calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent}) calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent}), #6391ce calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent}) calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent+this.WebVisitPercent}), #81acd9 calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent+this.WebVisitPercent}) calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent+this.WebVisitPercent+this.locVisitPercent}), #aac9e6 calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent+this.WebVisitPercent+this.locVisitPercent}) calc(3.6deg * ${this.fbVisitPercent+this.IgVisitPercent+this.WsVisitPercent+this.WebVisitPercent+this.locVisitPercent+this.telVisitPercent})`
    },
  }
}
</script>

<style scoped>
.pie-chart{
  background: repeating-conic-gradient(
    from 0deg,
    #293451 0deg calc(3.6deg * 25),
    #3d5490 calc(3.6deg * 25) calc(3.6deg * 25),
    #4566b0 calc(3.6deg * 25) calc(3.6deg * 25),
    #6391ce calc(3.6deg * 25) calc(3.6deg * 25),
    #81acd9 calc(3.6deg * 25) calc(3.6deg * 25),
    #aac9e6 calc(3.6deg * 25) calc(3.6deg * 25)
  );
}
</style>

cacl(3.6 * porcentaje)

0,1
1, 1+2
1+2, 1+2+3
1+2+3, 1+2+3+4.....


eto + eto