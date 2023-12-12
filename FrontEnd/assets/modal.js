// Sélection des éléments DOM
const modalWrapper = document.querySelector(".modal-wrapper");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const galleryModal = document.getElementById("gallery-modal");
const logoutBtn = document.getElementById("logoutBtn");
const wrapperPhoto = document.querySelector(".wrapperPhoto");
const ajoutBtn = document.querySelector(".ajout");
const photoTriggers = document.querySelectorAll(".photo-trigger");

//Modal/////////////////////////////////////////////////////////////
// Fonction pour basculer l'état du modal
function toggleModal(e) {
  e.preventDefault();
  modalWrapper.classList.toggle("active");
}
// Attacher les gestionnaires d'événements pour les déclencheurs modaux
modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
});

function togglePhoto(e) {
  e.preventDefault();

  // Ajouter un gestionnaire d'événements à la croix de la deuxième modal
  const closePhotoBtn = document.querySelector(".close-photo");

  // Ajouter un gestionnaire d'événements pour fermer la modal
  function closeModal() {
    wrapperPhoto.classList.remove("active");
    closePhotoBtn.removeEventListener("click", closeModal);
  }

  closePhotoBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Empêcher la propagation au conteneur général
    closeModal();
  });

  wrapperPhoto.classList.toggle("active");
}

photoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", togglePhoto);
});

// Ajouter un gestionnaire d'événements pour le bouton "Ajouter une photo"
ajoutBtn.addEventListener("click", function (e) {});

//Gallerie////////////////////////////////////////////////////////////////////////
// Fonction asynchrone pour récupérer les œuvres depuis l'API
const fetchWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(
        `Erreur de chargement des œuvres. Code HTTP : ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'API :",
      error
    );
    throw error; // Propage l'erreur pour une gestion ultérieure si nécessaire
  }
};

// Fonction pour créer un élément dans la galerie
const createGalleryItem = (imageUrl) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = imageUrl;
  figure.classList.add("itemGallery");
  figure.appendChild(img);
  return figure;
};

// Fonction pour afficher les œuvres dans la galerie
const displayWorks = (works) => {
  galleryModal.innerHTML = ""; // Vide la galerie
  works.forEach((work) => {
    const galleryItem = createGalleryItem(work.imageUrl);
    galleryModal.appendChild(galleryItem);
  });
};

// Fonction asynchrone pour initialiser la galerie
const initializeGalleryModal = async () => {
  try {
    const works = await fetchWorks();
    displayWorks(works);
  } catch (error) {
    // Gérer l'erreur ici selon vos besoins
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};

// Appeler la fonction d'initialisation de la galerie lors du chargement de la page
document.addEventListener("DOMContentLoaded", initializeGalleryModal);

//Déconnexion//////////////////////////////////////////////////////////////
// Événement au clic sur le bouton de déconnexion
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
} else {
  console.error("Erreur : Le bouton de déconnexion n'a pas été trouvé.");
}

// Fonction de déconnexion
function logout() {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
}
