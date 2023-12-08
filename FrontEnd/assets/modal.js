const modalWrapper = document.querySelector(".modal-wrapper");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
});

function toggleModal(e) {
  e.preventDefault();
  modalWrapper.classList.toggle("active");
}

// Fonction pour se déconnecter
function logout() {
  // Supprimer le token du localStorage
  localStorage.removeItem("token");

  // Rediriger l'utilisateur vers la page d'index (ou une autre page de votre choix)
  window.location.href = "./index.html";
}

// Assurez-vous que le bouton de déconnexion a été récupéré avec succès
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  // Ajouter un gestionnaire d'événements au clic sur le bouton de déconnexion
  logoutBtn.addEventListener("click", () => {
    // Appeler la fonction de déconnexion
    logout();
  });
} else {
  console.error("Erreur : Le bouton de déconnexion n'a pas été trouvé.");
}
