import {useEffect, useState} from "react";
import {getAllMessages} from "@/pages/message-service.ts";
import {MessageType} from "@/pages/message-card.tsx";

export const useMessages = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const fetchMessages = () => {
        getAllMessages().then(res => {
            console.log(res.data)
            setMessages(res.data);
        });
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return {
        messages,
        fetchMessages,
    }
}