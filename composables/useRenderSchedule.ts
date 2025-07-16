export default function useRenderSchedule() {
  const actual_hour = new Date().getHours();
  const actual_minutes = new Date().getMinutes();
  const schedule_message = ref('');
  const actual_day = new Date().getDay();
  let isOpen:boolean = ref(false);
  
  
  function checkSchedule(day: { open_time: string; close_time: string }) {
    const [openHour, openMinutes] = day.open_time.split(':').map(Number);
    const [closeHour, closeMinutes] = day.close_time.split(':').map(Number);
    
    const openTotalMinutes = openHour * 60 + openMinutes;
    const closeTotalMinutes = closeHour * 60 + closeMinutes;
    
    const currentTotalMinutes = actual_hour * 60 + actual_minutes;
    
    if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
      schedule_message.value = `${day.open_time} - ${day.close_time}`;
      isOpen.value = true;
    } else {
      schedule_message.value = `${day.open_time} - ${day.close_time}`;
      isOpen.value = false;
    }
  }

  return { actual_day, checkSchedule, isOpen, schedule_message }
}