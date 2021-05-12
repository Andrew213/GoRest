export const blogListEl = document.querySelector('.blog-list');
export const navListEl = document.querySelector('.nav__list');
export const commentsEl = document.querySelector('.comments')
const articlesEl = document.querySelector('.article');

// Класс, c методами для построения DOM дерева 
class CreateDOM {

    /**
* Выводит на страницу список постов
* @param {Object} el Объект, который берется из массива GET запроса 
* @param {String} href Ссылка, которая ведет на другую страницу 
* @returns {HTMLElement} Выводит на страницу li элементы  
*/
    createPostDOM(el, href) {

        if (blogListEl) {

            blogListEl.innerHTML += `
                <li class="blog-list__item">
                    <a href="${href}" class="blog-list__link">${el.title}</a>
                </li>
                `

        }
    };

    /**
* Выводит на страницу пагинацию
* @param {Number} paginationCount Число страниц 
* @returns {HTMLElement} Выводит на страницу button элементы 
*/
    createPaginationDOM(paginationCount) {

        if (navListEl) {

            for (let i = 1; i <= paginationCount; ++i) {

                navListEl.innerHTML += `
                <li class="nav__item">
                    <button class="nav__link">${i}</button>
                </li>
                    `
            }
        };
    }

    /**
* Выводит на страницу конкретную статью
* @param {Object} el Объект статьи 
* @returns {HTMLElement} Вставляет HTML элемент статьи
*/
    createArticleDOM(el) {


        let html = `
            <h2 class="article__title">${el.title}</h2>
            <p class="article__body">${el.body}</p>
        `;

        articlesEl ? articlesEl.insertAdjacentHTML('afterbegin', html) : false
    }

    /**
* Выводит на страницу комментарии
* @param {Object} el Объект комментариев 
* @returns {HTMLElement} Вставляет HTML элемент комментариев
*/
    createCommentsDOM(el = null) {

        let html = `
                <li class="comments__item">
                    <h3 class="comments__name">${el.name}</h3>
                    <p class="comments__text">
                        ${el.body}
                    </p>
                </li>
                `
        commentsEl ? commentsEl.insertAdjacentHTML('beforeend', html) : false
    }

};

export const createDom_obj = new CreateDOM()

