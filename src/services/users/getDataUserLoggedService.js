
const getDataUserLoggedService = async ({ token }) => {

    const url = `${import.meta.env.VITE_URL_API}/users`;

    const response = await fetch(url,{
        headers: {
            authorization: token
        }
    });

    if(!response.ok) throw new Error(json.message);

    const json = await response.json();

    

    return json.data;
}

export default getDataUserLoggedService;