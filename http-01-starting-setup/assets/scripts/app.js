const listPost = document.querySelector('.posts');
const postTemplate = document.querySelector('#single-posts');
const fetchDataBtn = document.querySelector('#fetch');
const addDataForm = document.querySelector('form')


function sendHttpRequest(method, url, data){
    // const promise = new Promise((resolve, reject) => {
        
        // const xhr = new XMLHttpRequest();
        // xhr.setRequestHeader('Content-Type', 'application/json')
    //     xhr.open(method, url);
    //     xhr.onload = function(){
    //         if(xhr.status >= 200 && xhr.status < 300){
    //             resolve(xhr.response)
    //         } else {
                    // xhr.response;
    //             reject(new Error('Something went wrong'))
    //         };
    //     }
            
    //     xhr.responseType = 'json';
    //     xhr.send(JSON.stringify(post))
    //     xhr.onerror = function(){
    //         reject(new Error('Failed to send request'))
    //     }
    // }) 

    return fetch(url, {
        method: method,
        body: data,
        // body: JSON.stringify(data),
        // headers: {
        //     'Content-Type': 'application/json'
        // }        
    })
        .then(response => {
            if(response.status >= 200 && response.status <300){
                return response.json()
            } else {
                return response.json().then(errData => {
                    console.log(errData)
                    throw new Error ('Something wrogn - server side')
                });
            }
        })
        .catch(err => {
            console.log(err)
            throw new Error('Something went wrong!')
        })

}

async function fetchData(){
    try {
        const receivedData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
    
        for(const post of receivedData){
            const postEl = document.importNode(postTemplate.content, true)
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id
            listPost.append(postEl);
        }
    } catch(err){
        alert(err.message)
    }
}

fetchDataBtn.addEventListener('click', fetchData);

async function sendData(title, content){
    const userId = Math.random();
    post = {
        userId: userId,
        title: title, 
        body: content
    };

    const fd = new FormData(addDataForm);
    // fd.append('title:', title);
    // fd.append('body:', content);
    fd.append('userId:', userId);

    await sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd)
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




    // return fetch(url, {
    //     method: method,
    //     body: JSON.stringify(post),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => {
    //     if(response.status >= 200 && response.status < 300){
    //         return response.json()
    //     } else {
    //         return response.json().then(errData => {
    //             console.log(errData)
    //             throw new Error('Something went wrong - server-side');
    //         });
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    //     throw new Error('Something went wrong')
    // })