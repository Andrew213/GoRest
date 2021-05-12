/**
* Получает GET ответ с сервера
* @param {string} url URL адрес, на который поуступает GET запрос.
* @return {Object} Если ответ успешен, возвращет его , распарсив из JSON
*/
export const getRequest = async (url) => {

    const response = await fetch(url);

    if (response.status === 200) {

        return await response.json()

    }

    throw new Error('Ошибка:' + response.status)
};