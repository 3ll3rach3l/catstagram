window.addEventListener("DOMContentLoaded", e =>{
    let comments = document.querySelector(".comments");
    let newComment = document.createElement('div');

    getImage();
    let score = document.getElementsByClassName("score")[0];

    let counter = 0
    let newPic = document.getElementById("new-pic");

    newPic.addEventListener("click", e =>{
        getImage()
        counter = 0;
        score.innerHTML = counter;
        newComment.innerHTML = "";

    })

    let upVote = document.getElementById("upvote");
    let downVote = document.getElementById("downvote");

    upVote.addEventListener("click", e =>{
        //console.log(score)
        counter ++
        score.innerHTML = counter
    })
    downVote.addEventListener("click", e => {
        counter --;
        score.innerHTML = counter;
    })

    let commentForm = document.querySelector("form");
    let input = document.getElementById("user-comment")

    commentForm.addEventListener("submit", e =>{
        e.preventDefault();
        let formInfo = new FormData(commentForm);
        formInfo.append('test', input.value)
        console.log(comments)
        comments.appendChild(newComment);
        newComment.innerHTML += `<div> ${input.value} </div>` ;
        input.value = ""

    })
    
    
})



function getImage(){
    let loaded = document.getElementById("getloader");
    fetch('/kitten/image')
     .then(res => {
         if(!res.ok) {
             throw res;
         }
        return res.json()
    })
     .then(res => {
         let catPic = document.querySelector("img");
         catPic.setAttribute("src", res.src)
        // console.log(res)
         loaded.innerHTML = "";

     }).catch(err =>{
         err.json().then(errJSON => {

            document.querySelector(".error").innerHTML = errJSON.message;
         })
         loaded.innerHTML = "";
     })

     loaded.innerHTML += "Loading..."


}
