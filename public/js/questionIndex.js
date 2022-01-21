
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-button-post');
    deleteButton.addEventListener('click', (e) => {
        const modal = document.querySelector('.confirm-modal');
        modal.style.display = "block";
        // if (e.target == modal) {
        //     modal.style.display = "none";
        // }
        // e.stopPropagation();
        return
    })
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('http://localhost:8080/comments')
        const {comments,answers} = await res.json()
        const commentContainer = document.querySelector(".comment-container");
        console.log({comments})
        console.log({answers})
        const messageArray= []
        for(let i=0; i< comments.length;i++){
            for(let j=0; j <answers.length;j++){
                console.log(comments[i].answerId === answers[j].id)
                if(comments[i].answerId === answers[j].id){
                    const message =
                    `
                        <div>
                            <span>
                                ${comments[i].User.userName}
                            </span>
                            <p> 
                                ${comments[i].content}
                            </p>
                        </div>
                    `
                    messageArray.push(message)
                }
            }
        }
        console.log(messageArray)
        commentContainer.innerHTML = messageArray.join("")
    }
    catch (e) {
        console.error(e);
    }
});

        // const commentHTML = comments.map((comment)=> {
        //     const answerid = 
            
        //         `
        //             <div>
        //                 <span>
        //                     ${comment.User.userName}
        //                 </span>
        //                 <p> 
        //                     ${comment.content}
        //                 </p>
        //             </div>
        //         `
            
        // })

