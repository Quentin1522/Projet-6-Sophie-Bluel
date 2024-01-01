// Récupération des éléments du DOM
const gallery = document.getElementById("gallery");
const filters = document.querySelector(".filters");

// Fonction asynchrone pour effectuer une requête API et récupérer les œuvres
const getApi = async () =>
  await (await fetch("http://localhost:5678/api/works")).json();

// Fonction asynchrone pour effectuer une requête API et récupérer les catégories
const getCategories = async () =>
  await (await fetch("http://localhost:5678/api/categories")).json();

// Fonction pour créer un élément dans la galerie
const displayApi = (api) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  // Attribution des valeurs à chaque élément
  img.src = api.imageUrl;
  figcaption.textContent = api.title;

  // Ajout des éléments à la figure
  figure.classList.add("itemGallery");
  figure.append(img, figcaption);

  // Ajout de la figure à la galerie
  gallery.appendChild(figure);
};

// Fonction pour afficher les œuvres dans la galerie
const displayApis = (apis) => {
  // Vide la galerie avant d'y ajouter de nouveaux éléments
  gallery.innerHTML = "";
  // Appelle la fonction displayApi pour chaque œuvre
  apis.forEach(displayApi);
};

// Fonction asynchrone pour créer les boutons de catégorie
const createCategoryButtons = async () => {
  // Récupération des catégories depuis l'API
  const categories = await getCategories();

  // Pour chaque catégorie, créer un bouton et l'ajouter aux filtres
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    filters.appendChild(btn);
  });
};

// Fonction asynchrone pour filtrer les œuvres par catégorie
const filterByCategory = async () => {
  // Récupération de toutes les œuvres depuis l'API
  const allGallery = await getApi();
  // Sélection de tous les boutons de filtre
  const buttons = document.querySelectorAll(".filters button");

  // Pour chaque bouton de filtre, ajouter un écouteur d'événement de clic
  buttons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      // Récupération de l'ID de la catégorie depuis le bouton cliqué
      const categoryId = e.target.id;

      // Filtrer les œuvres en fonction de la catégorie sélectionnée
      //categoryId différents de 0
      const filteredGallery =
        categoryId !== "0"
          ? allGallery.filter((api) => api.categoryId == categoryId)
          : allGallery;

      // Afficher les œuvres filtrées dans la galerie
      displayApis(filteredGallery);
    });
  });
};

// Fonction asynchrone pour initialiser la galerie
const initializeGallery = async () => {
  // Créer les boutons de catégorie
  await createCategoryButtons();
  // Ajouter les écouteurs d'événements pour les filtres
  await filterByCategory();
  // Récupérer toutes les œuvres et les afficher dans la galerie
  const allGallery = await getApi();
  displayApis(allGallery);
};

// Sélectionnez l'élément parent
const modifyContainer = document.querySelector(".modify");

// Fonction pour créer le bouton "modifier" dynamiquement
const createModifyButton = () => {
  // Créer le bouton modifier
  const modifyButton = document.createElement("a");
  modifyButton.textContent = "modifier";
  modifyButton.classList.add("modal-trigger");

  // Créer le SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 16 16");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z"
  );
  path.setAttribute("fill", "black");

  // Ajouter le bouton et le SVG à l'élément parent
  const modifyContainer = document.querySelector(".modify-item");
  svg.appendChild(path);
  modifyContainer.appendChild(modifyButton);
  modifyContainer.appendChild(svg);
};

// Appeler la fonction pour créer le bouton
createModifyButton();

// Sélectionnez l'élément input file
const imageInput = document.getElementById("image");

// Sélectionnez le bouton Valider
const validerButton = document.getElementById("submitValider");

// Sélectionnez l'élément conteneur-ajout
const conteneurAjout = document.querySelector(".conteneur-ajout");

// Ajoutez un écouteur d'événement input sur l'élément input file
imageInput.addEventListener("input", () => {
  // Vérifiez si un fichier a été sélectionné
  if (imageInput.files.length > 0) {
    // Récupérez le fichier sélectionné
    const selectedImage = imageInput.files[0];

    // Créez un objet URL pour l'image sélectionnée
    const imageURL = URL.createObjectURL(selectedImage);

    // Créez un élément img pour afficher l'image
    const previewImage = document.createElement("img");
    previewImage.src = imageURL;

    // Effacez le contenu précédent du conteneur-ajout
    conteneurAjout.innerHTML = "";

    // Ajoutez l'élément img au conteneur-ajout
    conteneurAjout.appendChild(previewImage);

    validerButton.style.backgroundColor = "#1d6154";
    validerButton.style.color = "white";
  }
});

// Ajout de l'état de connexion pour montrer/masquer les boutons de modification
const isLoggedIn = () => localStorage.getItem("token") !== null;

const updateModifyElements = () => {
  const modifyElements = document.querySelectorAll(".modify-item");
  modifyElements.forEach((elem) => {
    elem.style.visibility = isLoggedIn() ? "visible" : "hidden";
  });
};

// Initialisation de la galerie
document.addEventListener("DOMContentLoaded", async () => {
  await initializeGallery();
  updateModifyElements();
});

//Modal
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
function toggleGalleryModal() {
  galleryModal.classList.toggle("active");
}
// Mettre à jour la visibilité des boutons de suppression uniquement si la modal est active
if (galleryModal.classList.contains("active")) {
  updateDeleteButtons();
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

document.querySelectorAll(".close-modal").forEach((button) => {
  button.addEventListener("click", function () {
    // Assurez-vous que la galerie est bien fermée
    galleryModal.classList.remove("active");
    // Masquer les boutons de suppression puisque la modal est fermée
  });
});

// Fonction asynchrone pour récupérer les œuvres depuis l'API dans la modal
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

///////////////////////////////////
// Fonction pour créer un élément dans la galerie
const createGalleryItem = (work) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  // Ajouter les données récupérées à la balise img
  img.src = work.imageUrl;
  img.alt = work.title;

  figure.classList.add("itemGallery");
  figure.appendChild(img);

  // Création du bouton de suppression
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
      <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
    </svg>`;

  // Ajout du gestionnaire d'événement pour le bouton de suppression
  deleteButton.addEventListener("click", async (e) => {
    e.stopPropagation(); // Empêcher le déclenchement de l'événement parent
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${work.title}" ?`)) {
      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${work.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erreur lors de la suppression : ${response.statusText}`
          );
        }

        // Suppression de l'élément du DOM
        figure.remove();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  });

  // Ajout du bouton de suppression à l'élément figure
  figure.appendChild(deleteButton);

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
////////////////////////ENVOIE//////////////////////////////////////////////////
async function addWorkToGallery(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire

  // Récupère le token du localStorage
  const token = localStorage.getItem("token");

  // Récupérer l'image sélectionnée
  const selectedImage = imageInput.files[0];
  // Récupérer le titre
  const title = document.getElementById("title").value;
  // Récupérer l'ID de la catégorie, converti en entier
  const category = parseInt(document.getElementById("categorie").value);

  console.log(category);

  // Afficher les valeurs pour le débogage
  console.log("Image sélectionnée: ", selectedImage);
  console.log("Titre: ", title);
  console.log("Categorie: ", category);
  console.log("Token: ", token);

  // Vérifier si toutes les données nécessaires sont présentes
  if (selectedImage && title && !isNaN(category) && token) {
    // Créer un FormData qui contiendra les fichiers et les autres champs du formulaire
    const formData = new FormData();
    formData.append("image", selectedImage); // Ajouter l'image au FormData
    formData.append("title", title); // Ajouter le titre au FormData
    formData.append("category", category); // Ajouter l'id de la catégorie au FormData/

    try {
      // Effectuer la requête HTTP POST pour envoyer le FormData à l'API
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      // Vérifier que la réponse est valide
      if (response.ok) {
        // Le code pour traiter la réponse et mettre à jour la galerie...
      } else {
        throw new Error(`Erreur: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau projet:", error);
    }
  }
}

console.error;
////////////////////////ENVOIE//////////////////////////////////

//////////
// Fonction pour ouvrir une modal spécifique
function openModal(modal) {
  modal.classList.add("active");
  updateDeleteIconsVisibility("visible"); // Rendre les icônes de suppression visibles
}

// Fonction pour fermer une modal spécifique
function closeModal(modal) {
  modal.classList.remove("active");
  updateDeleteIconsVisibility("hidden"); // Masquer les icônes de suppression
}

// Mise à jour de la visibilité des icônes de suppression
function updateDeleteIconsVisibility(visibility) {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.style.visibility = visibility;
  });
}

// Attacher les gestionnaires d'événements à ouvrir/fermer les modals
document.addEventListener("DOMContentLoaded", () => {
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => toggleModal(modalWrapper));
  });

  photoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => toggleModal(galleryModal));
  });

  // Fermer les modals si les boutons de fermeture sont cliqués
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(galleryModal);
      closeModal(modalWrapper);
    });
  });
});

// Fonction pour basculer entre ouvrir et fermer une modal
function toggleModal(modal) {
  if (modal && modal.classList && modal.classList.contains("active")) {
    modal.classList.remove("active");
    updateDeleteIconsVisibility("hidden"); // Masquer les icônes de suppression
  } else if (modal && modal.classList) {
    modal.classList.add("active");
    updateDeleteIconsVisibility("visible"); // Rendre les icônes de suppression visibles
  }

  // Vérifier si modal existe et possède la propriété classList
  if (modal && modal.classList) {
    // Sélectionnez les icônes de suppression à l'intérieur de la modal
    const deleteIcons = modal.querySelectorAll(".delete-button svg");

    // Parcourez chaque icône et ajoutez ou supprimez la classe pour modifier la visibilité
    deleteIcons.forEach((icon) => {
      icon.classList.toggle("visible");
    });
  }
}

////////////////:
