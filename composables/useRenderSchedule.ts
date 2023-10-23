export default function useRenderSchedule() {
  const actual_hour = new Date().getHours();
  const actual_minutes = new Date().getMinutes();
  const schedule_message = ref('');
  const actual_day = new Date().getDay();
  const isOpen = ref(false);

  function getFranja(hour:string) {
    const queEs = hour.substring(0, 2);
    if(parseInt(queEs) > 12) { return 'PM' } else { return 'AM' }
  }

  function checkearDisponibilidad(hour: object) {
    const business_open = hour.open_time;
    const business_close = hour.close_time;
    const business_hora = business_close.substring(0, 2);
    const business_minutes = business_close.substring(3,5);

    if(actual_hour > parseInt(business_hora) && actual_minutes > parseInt(business_minutes)) {
      schedule_message.value = `Cerrados: ${business_open} ${getFranja(business_open)} - ${business_close} ${getFranja(business_close)}`;
      isOpen.value = false;
      console.log(schedule_message.value)
    } else {
      schedule_message.value = `Abierto: ${business_open} ${getFranja(business_open)} - ${business_close} ${getFranja(business_close)}`;
      isOpen.value = true;
      console.log(schedule_message.value);
    }
  }

  return { actual_day, checkearDisponibilidad, isOpen, schedule_message }
}