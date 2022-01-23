
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-button-post');
    deleteButton.addEventListener('click', (e) => {
        const modal = document.querySelector('.confirm-modal');
        const background = document.querySelector('.confirm-modal-overlay');
        modal.style.display = "block";
        background.style.display = "block";
        return
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const cancelDeleteButton = document.querySelector('.cancel-delete-button');
    cancelDeleteButton.addEventListener('click', (e) => {
        const hideModal = document.querySelector('.confirm-modal');
        const hideBackground = document.querySelector('.confirm-modal-overlay');
        
        hideModal.style.display = "none";
        hideBackground.style.display = "none";
        if (e.target == modal) {
            modal.style.display = "none";
        }
        e.stopPropagation();
        return
    })
})

