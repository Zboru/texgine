function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
function getData() {
  return fetch('http://localhost:1337/api/userData').then(handleResponse).then((data) => {
    console.log(data);
  });
}

export default {
  getData,
};
