import axios from 'axios';

export const getAllMessages = async () => {
    return await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/messages`
    );
}