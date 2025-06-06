import { loadStripe } from '@stripe/stripe-js';
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
  
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    clientSecret: process.env.CONSUMER_SECRET,
    appearance: {/*...*/},
    payment_method_types: ['card'],
  };
  
  let elements = ref(null);
  let paymentElement = ref<StripeCardElement | null>(null);
  watch(stripe, (newValue) => {
    elements.value = stripe.value!.elements({
      ...options,
      paymentMethodCreation: 'manual'
    });
    const paymentElementOptions = { layout: 'accordion'};
    paymentElement = elements.value.create('payment', paymentElementOptions);
    paymentElement.mount('#card-form');
  })
  
  async function submitPayment(email:string, name:string, quantity: number | string, id: number | string, ref: string | undefined): Promise<void> {
    await elements.value.submit();
    return new Promise(async (resolve, reject) => {
      try {
        const result = await stripe.value!.createPaymentMethod({
          elements: elements.value,
          params: {
            billing_details: {
              name: name,
              email: email
            },
          }
        });
        if(result?.paymentMethod) {
          await processPayment(result.paymentMethod?.id, quantity, id, ref )
        }
        
        if (result?.error) throw result.error;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  
  async function processPayment(pm:string | undefined, quantity: number | string, id: number | string, ref: string | undefined) {
    Swal.showLoading();
    await $fetch('user-plans', {
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
        if(!response._data.status) {
          Swal.hideLoading();
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: response._data.message || 'An error occurred while processing your payment.',
          });
          return;
        } else {
          Swal.hideLoading();
          Swal.close()
          successPayment.value = true;
          document.body.classList.add('modal-open');
          setTimeout(() => {
            localStorage.removeItem('ref');
            successPayment.value = false;
            document.body.classList.remove('modal-open');
            navigateTo("/profile?tab=plan");
          }, 3000);
        }
      }
    })
  }
  
  return {
    initStripe,
    submitPayment,
    successPayment,
    stripeMessage,
  }
}