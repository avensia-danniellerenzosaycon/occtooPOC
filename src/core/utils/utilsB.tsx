import { createStandaloneToast } from "@chakra-ui/react";
import moment from "moment";
import Cookies from 'js-cookie';

const { toast } = createStandaloneToast()

export const Message = (status: 'success' | 'error' | 'warning' | 'info', text: string, duration: number = 3000) => {
    toast({
        description: text,
        status: status,
        duration: duration,
        isClosable: true,
        position: 'top'
    });
}

export const ParseToDisplayDate = (dateString: string) => {
    const formattedDate = moment(dateString).format('MMM DD, YYYY HH:mm');
    return formattedDate;
}

export enum ECookies2 {
    ACCESS_TOKEN = 'access_token',
}
export const setCookie = (name: ECookies2, value: string, seconds: number) => {
    const days = seconds / 86400;
    Cookies.set(name, value, { expires: days });
}

export const getCookie = (name: ECookies2) => {
    return Cookies.get(name);
}