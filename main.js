async function getPosts(){
    let res = await fetch('http://localhost:8080/posts');
    let data = await res.json();

    data.forEach((dataPost) => {
        document.querySelector('.post-list').innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${dataPost.title}</h5>
                <p class="card-text"> ${dataPost.description}</p>
                <a href="#" class="card-link"> Click her </a>
            </div>
        </div>
`
    })
    console.log(data);
}
getPosts();

async function addPost(){
    const inputTitle = document.getElementById('inputTitle').value;
    const inputDescription = document.getElementById('inputDescription').value;

    let formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('description', inputDescription);

    const response = await fetch('http://localhost:8080/addpost', {
        method: "POST",
        body: formData
    });

    const data = response.json();

    // if (data.status === true){
    //     await getPosts();
    // }

}