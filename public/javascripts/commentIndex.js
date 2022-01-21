document.addEventListener("DOMContentLoaded", (e)=>{
    try {
        const res = await fetch('http://localhost:8080/comments');
        const {questions} = await res.json();
        const commentContainer = document.querySelector('.comment-container');
        const commentHTML = questions.map(({content}) => {
            `<div class="comments">
                <span class="comments-content">
                    ${content}
                </span>
            </div>`
        })
        commentContainer.innerHTML = commentHTML.join("");

    } catch(error) {

        console.log(error)
    }
})