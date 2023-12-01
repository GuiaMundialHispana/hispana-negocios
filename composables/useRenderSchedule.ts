export default function useRenderSchedule() {
  const actual_hour = new Date().getHours();
  const actual_minutes = new Date().getMinutes();
  const schedule_message = ref('');
  const actual_day = new Date().getDay();
  let isOpen:boolean = ref(false);

  function getFranja(hour:string) {
    const queEs = hour.substring(0, 2);
    if(parseInt(queEs) > 12) { return 'PM' } else { return 'AM' }
  }

  function checkearDisponibilidad(hour: object) {
    const business_open = hour.open_time;
    const business_close = hour.close_time;
    const business_hora_close = business_close.substring(0, 2);
    const business_minutes_close = business_close.substring(3,5);
    const business_hora_open = business_open.substring(0, 2);
    const business_minutes_open = business_open.substring(3,5);

    if(actual_hour > parseInt(business_hora_open) && actual_minutes >  parseInt(business_minutes_open)){
      schedule_message.value = `Abierto: ${business_open} ${getFranja(business_open)} - ${business_close} ${getFranja(business_close)}`;
      isOpen.value = true;
      // console.log(getFranja(business_open), getFranja(business_close))
    } else if(actual_hour > parseInt(business_hora_close) && actual_minutes >  parseInt(business_minutes_close)) {
      schedule_message.value = `Cerrados: ${business_open} ${getFranja(business_open)} - ${business_close} ${getFranja(business_close)}`;
      isOpen.value = false;
      // console.log(getFranja(business_open), getFranja(business_close))
    }
  }

  return { actual_day, checkearDisponibilidad, isOpen, schedule_message }
}