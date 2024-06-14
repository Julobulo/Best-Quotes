import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify'; // Ensure toast is imported
import dotenv from "dotenv";
dotenv.config();
const { domainName } = process.env;

export async function getSession() {
    try {
        const response = await axios.get(`${domainName}/quotes/session`);
        return response.data.token;
    } catch (error) {
        toast.error(`Error: Couldn't get session... Error: ${error}`);
        console.log(error);
        return null;
    }
}
