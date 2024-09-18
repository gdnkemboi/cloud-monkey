document.addEventListener("DOMContentLoaded", () => {
  const createFolderModal = document.getElementById("folderModal");
  const editFolderModal = document.getElementById("editFolderModal");
  const deleteFolderModal = document.getElementById("deleteFolderModal");
  const createFolderBtn = document.getElementById("addFolderBtn");
  const editFolderBtn = document.getElementById("editFolderBtn");
  const deleteFolderBtn = document.getElementById("deleteFolderBtn");

  // Show the modal when the button is clicked
  document.addEventListener("click", (event) => {
    if (event.target === createFolderBtn) {
      createFolderModal.style.display = "block";
    } else if (event.target === editFolderBtn) {
      editFolderModal.style.display = "block";
    } else if (event.target === deleteFolderBtn) {
      deleteFolderModal.style.display = "block";
    }
  });

  // Close modals when the "x" is clicked
  const closeButtons = document.querySelectorAll(".modal .close");

  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close the delete modal when "No" is clicked
  document.querySelector(".deleteNo").addEventListener("click", () => {
    deleteFolderModal.style.display = "none";
  });

  // Close the modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target == createFolderModal) {
      createFolderModal.style.display = "none";
    } else if (event.target == editFolderModal) {
      editFolderModal.style.display = "none";
    } else if (event.target == deleteFolderModal) {
      deleteFolderModal.style.display = "none";
    }
  });
});
