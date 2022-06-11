import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://172.16.1.138:81';

 const useAxios = () => {
    const [response, setResponse] = useState(undefined);
    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async (params) => {
      try {
        setLoading(true)
       const result = await axios.request(params);
       setResponse(result.data);
      //  setError("")
       } catch( error ) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
         setResponse(undefined)
       } finally {
         setLoading(false);
       }
    };


    return [ response, loading,fetchData ];
};
export default useAxios