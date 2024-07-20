import axios from 'axios';
import {MessageType} from "@/pages/message-card.tsx";

export const getAllMessages = async () => {
    return await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/messages`
    );
}

export const addMessage = async (request: MessageType) => {
    return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/messages`,
        request,
    );
}