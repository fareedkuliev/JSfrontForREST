// let id = null;
async function getPosts(){
    let res = await fetch('http://localhost:8080/posts');
    let data = await res.json();

    data.forEach((dataPost) => {
        document.querySelector('.post-list').innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${dataPost.title}</h5>
                <p class="card-text"> ${dataPost.description}</p>
                <a href="#" class="card-link" onclick="selectData('${dataPost.id}', '${dataPost.title}', '${dataPost.description}')"> Post updating </a>
                <a href="#" class="card-link" onclick="deletePost(${dataPost.id})"> Delete </a>
            </div>
        </div>
`
    })
    console.log(data);
}

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

    if (data.status === true){
        location.reload();
    }
}

getPosts();

async function deletePost(id){
    const response = await fetch(`http://localhost:8080/deletepost/${id}`, {
        method: "DELETE"
    })
const data = await response.json()
    if(data.status === true){
     location.reload();
    }
}

async function selectData(id, title, description){
    document.getElementById('inputID').value = id;
    document.getElementById('inputTitleToUpdate').value = title;
    document.getElementById('inputDescriptionToUpdate').value = description;
}
async function updatePost(){

    const id = document.getElementById('inputID').value;
    const title = document.getElementById('inputTitleToUpdate').value;
    const description = document.getElementById('inputDescriptionToUpdate').value;
    const dataToUpdate = {
        "title": `${title}`,
        "description": `${description}`
    }
    const response = await fetch(`http://localhost:8080/updatepost/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dataToUpdate)
    })

    const data = await response.json()

    if(data.status === true){
        location.reload();
    }
}