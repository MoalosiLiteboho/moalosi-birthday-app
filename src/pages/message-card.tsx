import {Card, CardBody, CardHeader, User} from "@nextui-org/react";

export type MessageType = {
    name: string;
    message: string;
    icon: string;
    time: string;
    color: "primary" | "secondary" | "warning" | "danger" | "default" | "success";
}

export type MessageCardProps = MessageType & {
    className?: string;
}

export default function MessageCard({message, name, icon, time, color}: MessageCardProps) {
    return (
        <Card>
            <CardHeader>
                <User
                    name={name}
                    description={`${time}`}
                    avatarProps={{
                        name: `${icon}`,
                        isBordered: true,
                        color: `${color}`
                    }}
                />
            </CardHeader>
            <CardBody className="text-center text-sm -mt-3">
                {message}
            </CardBody>
        </Card>
    );
}