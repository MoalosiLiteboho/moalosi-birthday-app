import axios from 'axios';

export const getAllMessages = async () => {
    return await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/messages`
    );
}

export const addMessage = async (request: unknown) => {
    return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/messages`,
        request,
    );
}