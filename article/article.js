import { createDom_obj, commentsEl } from '../createDOM.js'
import { getRequest } from '../getRequest.js'

let URL_post = new URL('https://gorest.co.in/public-api/posts');
let URL_comment = new URL('https://gorest.co.in/public-api/comments')
let article_id = new URLSearchParams(window.location.search).get('id');

URL_post.pathname += `/${article_id}`;

getRequest(URL_post.href)
    .then(response => {

        const article = response.data;

        createDom_obj.createArticleDOM(article)

    })

URL_comment.searchParams.set('post_id', article_id)

getRequest(URL_comment.href)
    .then(response => {

        const commentsArr = response.data;

        if (commentsArr.length > 0) {

            commentsArr.forEach(el => createDom_obj.createCommentsDOM(el))

        } else {

            commentsEl.insertAdjacentText('beforeend', 'No comments')
        }
    })


