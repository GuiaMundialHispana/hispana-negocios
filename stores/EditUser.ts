import { defineStore, acceptHMRUpdate } from 'pinia';
import { useUserStore } from '~/stores/User'

export const useUserEditStore = defineStore('UserEdit', {
  state: () => {
    return {
      user: useUserStore(),
      editUserData: {
        user_id: useUserStore().userData.id,
        name: useUserStore().userData.name,
        lastname: useUserStore().userData.lastname,
        birthdate: useUserStore().userData.birthdate,
        country_id: useUserStore().userData.country_id,
        cellphone: useUserStore().userData.cellphone,
        phone: useUserStore().userData.phone,
        email: useUserStore().userData.email,
        profile_pic: useUserStore().userData.profile_pic,
        oldPassword: Number,
        password:  Number,
        password_confirmation: Number,
      },
      images: null
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserEditStore, import.meta.hot))
}