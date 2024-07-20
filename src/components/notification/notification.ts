import {toast} from "sonner";

export const successNotification = (title: string, description: string) => {
    toast.success(
        title,
        {description}
    );
}

export const errorNotification = (title: string, description: string) => {
    toast.error(
        title,
        {description}
    );
}