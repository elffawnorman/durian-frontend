import axios from "axios";


export const createArticle = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/article', value, {
        headers: {
            authtoken,
        },
    });
};

export const listArticle = async (count) =>
    await axios.get(process.env.REACT_APP_API + "/article/" + count);


export const removeArticle = async (authtoken, id) =>
    await axios.delete(process.env.REACT_APP_API + "/article/" + id,
        {
            headers: {
                authtoken
            }
        })

export const readArticle = async (id) =>
    await axios.get(process.env.REACT_APP_API + "/articles/" + id);

export const editArticle = async (authtoken, id, article) =>
    await axios.put(process.env.REACT_APP_API + "/article/" + id,
        article,
        {
            headers: {
                authtoken
            }
        })

export const listArticleBy = async (sort,limit) =>
    await axios.post(process.env.REACT_APP_API + '/articleby', {
        sort,
        limit
    });