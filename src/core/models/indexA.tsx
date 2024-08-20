import { ECookies, getCookie } from "../utils/utils";

export const config = {
    url: 'https://global.occtoo.com/avensia/drsAvensiaV1/v1/danniellerenzosayconavensiav1',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};

export const fetchApi = async (url: string, method: string, payload?: any) => {
    const bearer = getCookie(ECookies.ACCESS_TOKEN);
    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${bearer}`
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchAccessToken = async () => {
    const response = await fetch(
        `https://destinations.occtoo.com/destinations/8c5c7bc6-4a4b-4fb1-9234-eead5005910c/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: "cfef5a49-6883-4854-8458-2fb1e0376386",
                clientSecret: "LqaTnANrwYF4aoOJfgFz1YbJvn12yz8VclXJHlQ/5J8="
            }),
        }
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Assuming the token is in the response
}

export interface IProduct {
    id: string;
    imageUrl: string;
    entityType: string;
    kategorihierarki: string;
    produktNumber: string;
    disposition: string;
    produktName: string;
    lifecycleStatus: string;
    introductionDate: string;
    approve: string;
}

// Updated getProducts function to accept filters
export const getProducts = async (filters?: Record<string, string>) => {
    const queryString = filters ? '?' + new URLSearchParams(filters).toString() : '';
    const urlWithFilters = `${config.url}${queryString}`;
    const ret = await fetchApi(urlWithFilters, 'GET');
    return ret;
};
