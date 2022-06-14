import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://94.182.191.108';

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


    return [ response, loading,fetchData,setResponse ];
};
export default useAxios