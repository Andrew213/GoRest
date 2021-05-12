import { createDom_obj, blogListEl, navListEl } from './createDOM.js'
import { getRequest } from './getRequest.js'

const goRestURL = new URL('https://gorest.co.in/public-api/posts');
const myURL = new URL(window.location);
const myURLforArticle = new URL(window.location)

const ARTICLE_FILE = '/article/article.html';

window.onload = () => {

    /**
* Устанавливает параметры поиска в URL и вызывает рендер страницы с новым URL
* @param {Number} num Номер страницы, которая запрашивается с сервера;
* @callback renderPostsList рендер таблицы с новым URL 
*/
    const setURL = (num) => {

        goRestURL.searchParams.set('page', num);

        myURL.searchParams.set('page', num);

        renderPostsList(goRestURL)

        window.history.pushState(null, null, myURL.href);
    };

    /**
* Рендерит пост
* @param {Promise} response Ответ, приходящий с сервера. 
* @callback createPostDOM Вызывает функцию рендера поста 
*/
    const renderPost = response => {

        const dataArr = response.data;

        blogListEl.innerHTML = '';
        navListEl.innerHTML = '';

        myURLforArticle.pathname = ARTICLE_FILE;

        myURLforArticle.searchParams.delete('page')

        dataArr.forEach(el => {

            myURLforArticle.searchParams.set('id', el.id)

            createDom_obj.createPostDOM(el, myURLforArticle.href)
        });
    };

    /**
* Отправляет GET запрос на сервер и рендерит странису со списком постов
* @param {URL} url URL куда отправляется запрос и парсится ответ
* @returns {Promise} Возвращается промис, в котором вызываются функции для рендера пагинации и списка 
*/
    const renderPostsList = url => {

        getRequest(url)
            .then(response => {

                let paginationCount = response.meta.pagination.pages;

                renderPost(response)

                createDom_obj.createPaginationDOM(paginationCount)
            })
    };


    renderPostsList(goRestURL);

    /**
* вызывается при клике по пагинации
* @param {Event} ev Cобытие клик
*/
    const handleClick = ev => {
        const navEl = ev.target.closest('.nav__link');
        const index = [...document.querySelectorAll('.nav__link')].indexOf(navEl)
        if (navEl) {
            setURL(index + 1);

        }
    };

    document.addEventListener('click', handleClick)
}
