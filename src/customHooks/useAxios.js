import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://172.16.1.138:81';

 const useAxios = () => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async (params) => {
      try {
        setLoading(true)
       const result = await axios.request(params);
       setResponse(result.data);
       setError("")
       } catch( error ) {
         setError(error);
         setResponse(undefined)
       } finally {
         setLoading(false);
       }
    };


    return [ response, error, loading,fetchData ];
};
export default useAxios