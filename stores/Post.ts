import { defineStore } from "pinia";

export const usePostsStore = defineStore('posts', {
  state:() => {
    return {
      category_id: 0,
      plan_id: 0,
      plan_pictures: 0,
      title: '',
      price: Number || String,
      price_us: Number || String,
      description: '',
      lat: Number || String,
      log: Number || String,
      address: '',
      country_id: Number || String,
      town_id: Number || String,
      city_id: Number || String,
      saved_images: [],
      new_images: [],
      new_portada: File || '',
      testPortada: false,
      exterior_color: Number,
      interior_color: Number,
      auto_category_id: Number || String,
      air_conditioned: Number,
      traction: String,
      transmission: String,
      engine: String || Number,
      mileage: String || Number,
      kilometer: String || Number,
      condition: String || Number,
      make_id: String || Number,
      model_id: String || Number,
      air_bag: String || Number,
      fuel_type: String || Number,
      year: String || Number,
    }
  }
});