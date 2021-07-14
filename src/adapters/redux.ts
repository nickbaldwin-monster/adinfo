export const getRedux = () => {
    return fetch("https://api.thedogapi.com/v1/images/search").then((response) =>
        response.json()
    );
};