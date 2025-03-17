import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';

export function useStripe() {
  const config = useRuntimeConfig();
  const stripe = ref<Stripe | null>(null);
  const successPayment = ref(false);
  const stripeMessage = ref('')

  async function initStripe(): Promise<void> {
    const stripeCore = await loadStripe(config.public.PUBLISH_KEY as string);
    stripe.value = stripeCore;
  }
  
  function setCardElement(elementToMount: string | HTMLElement): Promise<StripeCardElement> {
    return new Promise(async (resolve, reject) => {
      try {
        const elements = stripe.value!.elements();
        const card = elements!.create('card');
        card.mount(elementToMount);
        resolve(card);
      } catch (error) {
        reject(error);
      }
    });
  }

  function submitPayment(cardElement: StripeCardElement, email:string, name:string, quantity: number | string, id: number | string, ref: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await stripe.value!.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: name,
            email: email
          },
        });
        if(result?.paymentMethod) {
          processPayment(result.paymentMethod?.id, quantity, id, ref )
        }

        if (result?.error) throw result.error;
        resolve();
      } catch (error) {
        stripeMessage.value = error.message;
        reject(error);
      }
    });
  }

  async function processPayment(pm:string | undefined, quantity: number | string, id: number | string, ref: string | undefined) {
    Swal.showLoading();
    await useFetch('user-plans', {
      method: 'POST',
      baseURL: config.public.API,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: {
        payment_method: pm,
        quantity: quantity,
        plan_id: id,
        token: ref
      },
      onResponse({response}) {
        Swal.hideLoading();
        Swal.close();
        if(response.status === 200 ) {
          successPayment.value = true;
          document.body.classList.add('modal-open')
          setTimeout(() => {
            successPayment.value = false;
            document.body.classList.remove('modal-open')
            navigateTo("/profile?tab=plan")
          }, 3000);
        }
        if(response._data.status === false) {
          stripeMessage.value = response._data.message;
        }
      }
    })
  }

  return {
    initStripe,
    setCardElement,
    submitPayment,
    successPayment,
    stripeMessage
  }
}