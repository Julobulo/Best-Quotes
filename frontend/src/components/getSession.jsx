import { useCookies } from 'react-cookie';
import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify'; // Ensure toast is imported

export function getSession() {
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID']);
    axios.get(`http://localhost:5555/quotes/session`)
    .then(response => {
        setCookie("sessionID", response.data.token);
        toast.info(`Got sessionID and stored it! Value: ${response.data.token}`);
    })
    .catch((error) => {
        toast.error(`Error: Couldn\'t get sessionID... Error: ${error}`);
        console.log(error);
    });
}
