export default function useRefresh(callback:any) {
  const intervalId = setInterval(callback, 120000) // 2 minutos en milisegundos

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
}