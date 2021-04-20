const listPost = document.querySelector('.posts');
const postTemplate = document.querySelector('#single-posts');
const fetchDataBtn = document.querySelector('#fetch');
const addDataForm = document.querySelector('form')


function sendHttpRequest(method, url, post){
    const promise = new Promise((resolve, reject) => {
        
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.response)
            } else {
                reject(new Error('Something went wrong'))
            };
        }
            
        xhr.responseType = 'json';
        xhr.send(JSON.stringify(post))
        xhr.onerror = function(){
            reject(new Error('Failed to send request'))
        }
    }) 
    return promise;
}

async function fetchData(){
    const receivedData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')

    for(const post of receivedData){
        const postEl = document.importNode(postTemplate.content, true)
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id
        listPost.append(postEl);
    }
}

fetchDataBtn.addEventListener('click', fetchData);

async function sendData(title, content){
    try{
        const userId = Math.random();
        post = {
            userId: userId,
            title: title, 
            body: content
        }
        await sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
    } catch(err){
        alert(err.mesage)
    }
}

addDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postTitle = document.querySelector('#title').value
    const postBody = document.querySelector('#content').value
    sendData(postTitle, postBody)

    document.querySelector('#title').value = '';
    document.querySelector('#content').value = '';
});

document.querySelector('ul').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        const postId = e.target.closest('li').id
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
        
        e.target.parentElement.remove();
    }
})