import {useState} from "react";
import {Button, Input, Modal, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {AnimatedList} from "@/components/ui/animated-list.tsx";
import MessageCard from "@/pages/message-card.tsx";
import WordRotate from "@/components/ui/word-rotate.tsx";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer.tsx";
import {errorNotification, successNotification} from "@/components/notification/notification.ts";
import {useMessages} from "@/pages/use-messages.ts";
import {addMessage} from "@/pages/message-service.ts";

function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {messages, fetchMessages} = useMessages();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const colors = ["primary", "secondary", "danger", "success", "default", "warning"];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const sentences = ["Kea Hola", "It's my Birthday"];
    const emojis = ['❤️‍🔥', '💌', '🥳', '🎉', '💞', '💫', '🙏', '🫂', '🌹', '🌍'];

    const handleInputValidation = (): boolean => {
        if(!name) {
            errorNotification(
                "Name is Empty",
                "Please enter your name"
            );
            return false;
        }else if(!message) {
            errorNotification(
                "Message is Empty",
                "Please enter your message"
            );
            return false;
        } else return true;
    }

    const handleSubmit = () => {
        setLoading(true);

        if(!handleInputValidation()) setLoading(false);
        else {
            const request = {
                name: name,
                message: message,
                icon: getEmoji(),
                time: getDate(),
                color: getColor()
            };
            addMessage(request).then(() => {
                successNotification(
                    "Message added",
                    "Message added successfully."
                );
                handleSuccess();
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    const handleSuccess = () => {
        fetchMessages();
        setName('');
        setMessage('');
        if(isOpen) onOpenChange();
        if(open) setOpen(!open);
    }

    const getDate = () => {
        const currentDate = new Date();

        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        const year = currentDate.getFullYear()

        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");

        return `${months[month]} ${day}, ${year} - ${hours}:${minutes}`;
    }

    const getEmoji = () => {
        const index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    }

    const getColor = () => {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
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
                        onPress={onOpen}
                    >
                        Write Message for Me
                    </Button>
                    <Drawer open={open}>
                        <DrawerTrigger asChild onClick={() => setOpen(!open)}>
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
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                    >
                        <ModalContent className="p-5">
                            <>
                                <ModalHeader className="w-full mb-2 font-light text-xl">
                                    <h1 className="text-center w-full">Wish Me Happy Birthday</h1>
                                </ModalHeader>
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
                            </>
                        </ModalContent>
                    </Modal>
                </div>
                <div className="h-screen w-full flex justify-center">
                    <div className="h-full w-full max-w-[26em]">
                        <AnimatedList>
                            {messages.map((item) => (
                                <MessageCard
                                    key={item.id}
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

export default Home