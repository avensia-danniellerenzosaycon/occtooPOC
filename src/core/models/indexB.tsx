

export const creds = {
    RToken: "https://destinations.occtoo.com/destinations/284de6cf-b746-4713-bf8b-6d7d3c36825b/token",
    clientId: "d06b6f17-723b-49c4-863e-63dcaa27b40d",
    clientSecret: "s7OFuRZgtijz911hSspwv2Q+ayvBHEdoRxyV/FgpAx4=",

}


const config = {
    url: 'https://global.occtoo.com/avensia/drSbama/v1/drsbamaendpoint',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};

const fetchApi = async (stoken: string, url: string, method: string, payload?: any) => {

    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${stoken}`
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
        `https://destinations.occtoo.com/destinations/284de6cf-b746-4713-bf8b-6d7d3c36825b/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: "d06b6f17-723b-49c4-863e-63dcaa27b40d",
                clientSecret: "s7OFuRZgtijz911hSspwv2Q+ayvBHEdoRxyV/FgpAx4=",
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
    id: string,
    imageUrl: string,
    productType: string,
    productTaxonomy: string,
    erpItemNumber: string,
    productStatus: string,
    productName: string,
    erpSystem: string,
    bestBeforeDays: string,
    owner: string
}

export const getProducts = async (token: string) => {
    const ret = await fetchApi(token, `${config.url}`, 'GET');
    return ret;
}   

