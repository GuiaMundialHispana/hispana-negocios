import { defineStore } from "pinia";

export const usePostsStore = defineStore('posts', {
  state:() => {
    return {
      category_id: 0,
      plan_id: 0,
      plan_pictures: 0,
      title: '',
      description: '',
      phone: '',
      whatsapp: '',
      website: '',
      instagram:'',
      facebook:'',
      lat: Number || String,
      log: Number || String,
      address: '',
      country_id: Number || String,
      town_id: Number || String,
      city_id: Number || String,
      saved_images: [],

      image: File || '',
      new_portada: File || '',
      testPortada: false,
      day_of_week: [],
    }
  }
});