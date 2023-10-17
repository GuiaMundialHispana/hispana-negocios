export default function useGetCountry() {
  const config = useRuntimeConfig();
  const countries = ref([]);

  const { data } = useFetch('generals/countries', {
    method: 'GET',
    baseURL: config.public.API,
    transform(data) {
      data.results.data.forEach(element => {
        if(element.id === 63 || element.id === 236) {
          countries.value.push(element)
        }
      })
    }
  });

  return { countries }
}