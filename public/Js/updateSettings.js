import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:4000/api/v1/users/${
        type === 'password' ? 'updateMyPassword' : 'updateMe'
      }`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
