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

let works = []; // Déclarez la variable works en dehors des fonctions

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
    throw error;
  }
};

// Fonction pour créer un élément dans la galerie avec un bouton de suppression
const createGalleryItem = (work) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  // Ajouter les données récupérées à la balise img
  img.src = work.imageUrl;
  img.alt = work.title;

  figure.classList.add("itemGallery");
  figure.appendChild(img);

  // Ajouter un événement pour afficher les détails au clic sur l'image
  figure.addEventListener("click", () => {
    console.log("Titre :", work.title);
    console.log("Catégorie :", work.category);
  });

  return figure;
};

// Fonction pour afficher les œuvres dans la galerie
const displayWorks = (works) => {
  console.log(works);
  galleryModal.innerHTML = ""; // Vide la galerie
  works.forEach((work) => {
    const galleryItem = createGalleryItem(work);
    galleryModal.appendChild(galleryItem);
  });
};

// Fonction asynchrone pour initialiser la galerie
const initializeGalleryModal = async () => {
  try {
    works = await fetchWorks();
    displayWorks(works);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la galerie :", error);
  }
};

// Appeler la fonction d'initialisation de la galerie
document.addEventListener("DOMContentLoaded", initializeGalleryModal);

// Fonction pour gérer l'ajout de photo
const handleAddPhoto = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("categorie").value;
  const imageInput = document.getElementById("image");

  if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
    alert("Veuillez sélectionner une image.");
    return;
  }

  const image = imageInput.files[0];

  if (!title || !category || !image) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  try {
    const apiUrl = "http://localhost:5678/api/works";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert(
        `Erreur lors de l'ajout de la photo. Code HTTP : ${response.status}`
      );
    }

    // Réactualiser la galerie après l'ajout de la nouvelle photo
    works = await fetchWorks();
    displayWorks(works);

    // Fermer la modal d'ajout de photo
    toggleAddPhotoModal();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la photo :", error);
  }
};
