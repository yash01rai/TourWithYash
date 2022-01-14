import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe(
      'pk_test_51KG0bUSAxOusrztZJtsYbgFsWGf6IYwHOZCAWEhW1DAHrNlD2aSVfOoXj3f9LcZEb6dlgU5iSl24vFcnfzIFogGs009ZbAhSsV'
    );

    // 1) Get checkout session from API
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
