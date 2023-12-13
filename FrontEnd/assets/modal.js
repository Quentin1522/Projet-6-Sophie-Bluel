// Sélection des éléments DOM
const modalWrapper = document.querySelector(".modal-wrapper");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const galleryModal = document.getElementById("gallery-modal");
const wrapperPhoto = document.querySelector(".wrapperPhoto");
const ajoutBtn = document.querySelector(".ajout");
const ajoutFile = document.querySelector(".ajout-file");
const photoTriggers = document.querySelectorAll(".photo-trigger");
const closePhotoBtn = document.querySelector(".close-photo");
const arrowBtn = document.querySelector(".arrow");
const formPhoto = document.querySelector(".form-photo");

//variable pour stocker l'image
let image = "";

// Fonction pour basculer l'état du modal principal
function toggleModal(e) {
  e.preventDefault();
  modalWrapper.classList.toggle("active");
}

// Fonction pour basculer l'état de la galerie photo
function toggleGalleryModal(e) {
  galleryModal.classList.toggle("active");
}

// Fonction pour basculer l'état de l'ajout de photo
function toggleAddPhotoModal(e) {
  wrapperPhoto.classList.toggle("active");
}

// Attacher les gestionnaires d'événements pour les déclencheurs modaux principaux
modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal);
});

// Attacher les gestionnaires d'événements pour le bouton "Gallerie photo"
photoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", toggleGalleryModal);
});

// Attacher un gestionnaire d'événements pour le bouton "Ajouter une photo"
ajoutBtn.addEventListener("click", toggleAddPhotoModal);

// Attacher un gestionnaire d'événements pour la croix de la deuxième modal
closePhotoBtn.addEventListener("click", toggleAddPhotoModal);

// Ajouter un gestionnaire d'événements à la flèche dans la deuxième modal
arrowBtn.addEventListener("click", (e) => {
  if (e) {
    e.preventDefault();
  }

  toggleAddPhotoModal();
  toggleGalleryModal();
});

// Fonction asynchrone pour récupérer les œuvres depuis l'API (exemple simulé)
const fetchWorks = async () => {
  try {
    // Remplacez cette URL par l'URL réelle de votre API
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
    throw error;
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

// Fonction asynchrone pour ajouter une photo à la galerie
const addPhotoToGallery = async (title, category, imageUrl) => {
  try {
    // Remplacez cette URL par l'URL réelle de votre API pour ajouter une photo
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        imageUrl: imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de l'ajout de la photo. Code HTTP : ${response.status}`
      );
    }

    // Récupérer à nouveau les œuvres après l'ajout de la nouvelle photo
    const updatedWorks = await fetchWorks();
    displayWorks(updatedWorks);

    // Fermer la modal d'ajout de photo
    toggleAddPhotoModal();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la photo :", error);
    // Gérer les erreurs ici (affichage d'un message à l'utilisateur, journalisation, etc.)
  }
};

// Gestionnaire d'événements pour la soumission du formulaire
formPhoto.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Récupération des données du formulaire
  const title = document.getElementById("title").value;
  const category = document.querySelector("select").value;
  const imageUrl = "URL_DE_VOTRE_IMAGE"; // Remplacez par l'URL réelle de l'image

  // Ajouter la photo à la galerie
  await addPhotoToGallery(title, category, imageUrl);
});

// Fonction asynchrone pour initialiser la galerie
const initializeGalleryModal = async () => {
  try {
    const works = await fetchWorks();
    displayWorks(works);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};

// Appeler la fonction d'initialisation de la galerie lors du chargement de la page
document.addEventListener("DOMContentLoaded", initializeGalleryModal);
