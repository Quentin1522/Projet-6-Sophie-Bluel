// Sélection des éléments du DOM
const modalWrapper = document.querySelector(".modal-wrapper");
const modalTriggers = document.querySelectorAll(".modal-trigger");

// Ajout des écouteurs d'événements sur chaque élément déclencheur de la modal
modalTriggers.forEach((trigger) => {
  // Lorsqu'un élément déclencheur est cliqué, la fonction toggleModal est appelée
  trigger.addEventListener("click", toggleModal);
});

// Fonction pour basculer l'état de la modal (active/inactive)
function toggleModal(e) {
  // Empêche le comportement par défaut du lien (évite le rechargement de page)
  e.preventDefault();

  // Bascule la classe "active" sur l'élément modalWrapper pour afficher ou masquer la modal
  modalWrapper.classList.toggle("active");
}

const apiDetails = {
  title: e.target.getAttribute("data-title"),
  imageUrl: e.target.getAttribute("data-image-url"),
  description: e.target.getAttribute("data-description"),
};

//Affiche les détails de l'oeuvre dans la modal
displayApiDetails(apiDetails);
