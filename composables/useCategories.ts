export default function useCategories() {
  const config = useRuntimeConfig();

  const { data: categories } = useFetch('generals/categories', {
    method: 'GET',
    baseURL: config.public.API,
    server:false,
    transform(data) {
      useState('categoriesResponse', () => data.results);
      return data.results
    }
  });

  return { categories }
}