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

// Appel de la fonction d'initialisation de la galerie
initializeGallery();
