export default function useCategories() {
  const config = useRuntimeConfig();

  const { data: categories } = useFetch('generals/categories', {
    method: 'GET',
    baseURL: config.public.API,
    server:false,
    transform(data) {
      return data.results
    }
  });

  return { categories }
}