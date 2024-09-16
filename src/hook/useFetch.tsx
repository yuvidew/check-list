
import axios , {AxiosResponse} from "axios";
import { enqueueSnackbar } from "notistack";

export const useFetch = () => {

    const fetchData = async (url : string) : Promise<any> => {
        try {
            const res : AxiosResponse<any> = await axios.get(url);
            return res.data
        } catch (error : any) {
            enqueueSnackbar(error.response?.data?.msg || 'An error occurred', { variant: 'error' });
            return null;
        }
    }

    return {
        fetchData
    }
}

// pi-angle-down