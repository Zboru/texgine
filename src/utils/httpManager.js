import axios from 'axios';
import { app } from '../db';

const httpManager = {
  async get(url) {
    const idToken = await app.auth().currentUser.getIdToken();
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },
};
export default httpManager;
