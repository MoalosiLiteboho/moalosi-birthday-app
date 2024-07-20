import {useEffect, useState} from "react";
import {MessageType} from "@/pages/message-card.tsx";

export const useMessages = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const fetchMessages = () => {
        setMessages([
            {
                "name": "Payment received",
                "message": "Magic UI",
                "time": "15m ago",
                "icon": "💸"
            },
            {
                "name": "User signed up",
                "message": "Magic UI",
                "time": "10m ago",
                "icon": "👤"
            },
            {
                "name": "New message",
                "message": "Magic UI",
                "time": "5m ago",
                "icon": "💬"
            },
            {
                "name": "New event",
                "message": "Magic UI",
                "time": "2m ago",
                "icon": "🗞️"
            }
        ])
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return {
        messages
    }
}