import { mapApiKey } from "../data/constants";


export const searchApi = (params) => {
    return fetch(`https://map.ir/search/v2/`, {
      method: 'POST',
      headers: {
        'x-api-key':mapApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
}