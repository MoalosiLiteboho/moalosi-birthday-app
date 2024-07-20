import {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {AnimatedList} from "@/components/ui/animated-list.tsx";
import MessageCard, {MessageType} from "@/pages/message-card.tsx";
import WordRotate from "@/components/ui/word-rotate.tsx";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer.tsx";
import {errorNotification, successNotification} from "@/components/notification/notification.ts";

const notifications: MessageType[] = [
    {
        name: "Payment received",
        message: "Magic UI",
        time: "15m ago",

        icon: "💸",
    },
    {
        name: "User signed up",
        message: "Magic UI",
        time: "10m ago",
        icon: "👤",
    },
    {
        name: "New message",
        message: "Magic UI",
        time: "5m ago",
        icon: "💬",
    },
    {
        name: "New event",
        message: "Magic UI",
        time: "2m ago",
        icon: "🗞️",
    },
];

function App() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const sentences = ["Kea Hola", "It's my Birthday"];

    const handleSubmit = () => {
        setLoading(true);
        setMessages(notifications);
        if(!name) {
            errorNotification(
                "Name is Empty",
                "Please enter your name"
            );
        }else if(!message) {
            errorNotification(
                "Message is Empty",
                "Please enter your message"
            );
        }else {
            const newMessage: MessageType = {
                name: name,
                message: message,
                icon: "🤡",
                time: new Date().toISOString()
            };

            messages.push(newMessage);
            successNotification(
                "Message added",
                "Message added successfully."
            );
            setName('');
            setMessage('');
        }
        setLoading(false);
    }

    return (
        <>
            <main className="p-5 h-screen">
                <div>
                    <h1 className="text-center text-2xl font-light font-sans">Hello! Moalosi Liteboho here</h1>
                    <WordRotate
                        words={sentences}
                        className="text-center text-lg text-primary font-light sans-light"
                    />
                </div>
                <div className="flex justify-center mt-1 mb-4">
                    <Button
                        variant="shadow"
                        color="success"
                        className="text-white hidden lg:flex"
                    >
                        Write Message for Me
                    </Button>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button
                                variant="shadow"
                                color="success"
                                className="text-white lg:hidden"
                            >
                                Write Message for Me
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="py-2 px-4 h-[45vh] focus:outline-none">
                            <DrawerHeader className="w-full text-center -mt-4 p-1 mb-2 font-light text-xl">
                                Wish Me Happy Birthday
                            </DrawerHeader>
                            <div className="flex flex-col gap-y-4">
                                <Input
                                    type="text"
                                    label="Name"
                                    placeholder="Enter your name"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    value={name}
                                    onValueChange={setName}
                                />
                                <Input
                                    type="text"
                                    label="Message"
                                    placeholder="Enter your message"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    value={message}
                                    onValueChange={setMessage}
                                />
                                <center>
                                    <Button
                                        variant="shadow"
                                        color="primary"
                                        isLoading={loading}
                                        onPress={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </center>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="h-screen w-full flex justify-center">
                    <div className="h-full w-full max-w-[26em]">
                        <AnimatedList>
                            {messages.map((item, index) => (
                                <MessageCard
                                    key={index}
                                    {...item}
                                />
                            ))}
                        </AnimatedList>
                    </div>
                </div>
            </main>

        </>
    );
}

export default App