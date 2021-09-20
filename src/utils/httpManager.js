import axios from 'axios';
import {getAuth} from "firebase/auth";

async function getConfig() {
  const auth = getAuth();
  const idToken = await auth.currentUser.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };
}

const httpManager = {
  async get(url) {
    return axios.get(url, await getConfig());
  },
  async post(url, data) {
    return axios.post(url, data, await getConfig());
  },
  async delete(url) {
    return axios.delete(url, await getConfig());
  },
  async put(url, data) {
    return axios.put(url, data, await getConfig());
  },
};
export default httpManager;
