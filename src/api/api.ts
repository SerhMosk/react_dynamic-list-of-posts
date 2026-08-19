export const BASE_URL = 'https://mate.academy/students-api';

export const request = (url: string, options: RequestInit) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw `${response.status} - ${response.statusText}`;
      }

      return response.json();
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log(error));
};
