//constantes globales
const gallery = document.getElementById("gallery");
const filters = document.querySelector(".filters");
const worksModal = document.querySelector(".work-modal");
const token = localStorage.getItem("token");

////////////////////////////////////////////

//récupération des works
async function getWork() {
  const responseWorks = await fetch("http://localhost:5678/api/works");
  //retourne array works
  return await responseWorks.json();
}
getWork();
////////////////////////////////////////////

//affiche les works
async function displayWorks(filterWorks = null) {
  // signifie que si la fonction displayWorks est appelée sans argument, le paramètre filterWorks aura automatiquement la valeur null.
  const works = filterWorks || (await getWork()); //  ||  = ou affecte une valeur à la variable works

  //works = tableau des works
  gallery.innerHTML = ""; // Vide la galerie avant de l'afficher

  works.forEach((works) => {
    //création des éléments
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const figure = document.createElement("figure");

    //attribution des valeurs à chaque éléments en les récupérant via le tableau des works
    img.src = works.imageUrl; //src = le format de la base de donnée
    figcaption.textContent = works.title; //title = le format de la base de donnée

    //ajout de img et figcaption à figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
    //ajout de figuire à gallery
    gallery.appendChild(figure);
  });
}
displayWorks();
////////////////////////////////////////////

//récupération des catégories
async function getCategories() {
  const responseCategories = await fetch(
    "http://localhost:5678/api/categories"
  );
  //retourne la liste des categori
  return await responseCategories.json();
}
getCategories();
////////////////////////////////////////////

//créer est afficher les bouttons de catégories
async function displayCategories() {
  //categories = liste des catégories
  const categories = await getCategories();
  categories.forEach((category) => {
    //création des bouttons catégories
    const btnCategories = document.createElement("button");
    //attribution des valeurs à chaque éléments en les récupérant via le tableau des catégories
    btnCategories.textContent = category.name;
    btnCategories.id = category.id;

    //ajout des catégories dans les boutons
    filters.appendChild(btnCategories);
  });
}
displayCategories();
////////////////////////////////////////////

//filter les catégories avec les boutons et changer la couleur des boutons de filtre
async function filterByCategories() {
  //récupere le tableau des works
  const arrayWorks = await getWork();

  // Sélection de tous les boutons de filtre
  const btns = document.querySelectorAll(".filters button");

  //Pour chaque bouton de filtre, ajouter un écouteur d'événement de clic
  btns.forEach((btn) => {
    //ajout de l'évement au click sur les boutons
    btn.addEventListener("click", async (e) => {
      // Récupération de l'ID de la catégorie depuis le bouton cliqué
      const categoryId = e.target.id;
      //categoryId différents de 0
      const filterWorks =
        categoryId !== "0"
          ? arrayWorks.filter((work) => work.categoryId == categoryId)
          : arrayWorks;

      // Afficher les œuvres filtrées dans la galerie
      displayWorks(filterWorks);

      //change la couleur des boutons de filtre
      btns.forEach((btn) => {
        btn.style.backgroundColor = "#ffffff";
        btn.style.color = "#1D6154";
      });
      e.target.style.backgroundColor = "#1D6154";
      e.target.style.color = "#ffffff";
    });
  });
}
filterByCategories();
////////////////////////////////////////////

//Modification de la page en fonction de l'état de connexion de l'utilsateur
//banner
const banner = document.querySelector(".banner"); //div banner (élement parent)
const textBanner = document.createElement("p"); //création du paragraphe de banner
textBanner.textContent = "Mode édition";
const svgIconBanner = `
<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
`;
banner.appendChild(textBanner); //place textBanner dans la div Banner
//ajoute la chaîne SVG en tant que nœud DOM à l'élément banner
banner.innerHTML += svgIconBanner;

//modify
const modifyItem = document.querySelector(".modify-item"); //div modify-item (élément parent)
const btnModify = document.createElement("a"); //bouton modifier
btnModify.textContent = "modifier"; //texte du bouton
btnModify.classList = "modal-trigger"; //class qui permet d'ouvir la modale
const SvgIconModify = `<svg class="modal-trigger" xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg> `;
modifyItem.appendChild(btnModify); //place le bouton dans la div modify-item
//ajoute la chaîne SVG en tant que nœud DOM à l'élément modify-item
modifyItem.innerHTML += SvgIconModify;
//vérification de l'état de connexion de l'utilisateur
//définit une fonction fléchée isLoggedIn qui vérifie si l'utilisateur est connecté en vérifiant la présence du token dans le stockage local.
const isLoggedIn = () => localStorage.getItem("token") !== null;

const updateUI = () => {
  const banner = document.querySelector(".banner");
  const modifyItem = document.querySelector(".modify-item");

  if (isLoggedIn()) {
    //si il est connecter
    banner.style.display = "flex"; // affiche banner
    modifyItem.style.visibility = "visible"; // affiche modify-item
    //si il n'est pas connecter
  } else {
    banner.style.display = "none"; // affiche pas banner
    modifyItem.style.visibility = "hidden"; // affiche pas modify-item
  }
};
updateUI();
////////////////////////////////////////////

//gestion des modales
const modalWrapper = document.querySelector(".modal-wrapper"); //récupere le container des modal (élément parent)
const modalTrigger = document.querySelectorAll(".modal-trigger"); // sélectionne tous les élément ayant la class "modal-trigger"
const firstModal = document.querySelector(".modal-principale"); //première modal
const secondModal = document.querySelector(".modal-secondaire"); //seconde modal
const buttonFirstModal = document.querySelector(".modal-principale-btn"); //bouton première modal
const arrow = document.querySelector(".arrow"); //récuperation de la flèche de la deuxième modale

//première modale et croix(avec modal-trigger)
modalTrigger.forEach((trigger) => {
  trigger.addEventListener("click", toggleModal); //au click dclenche la fonction toggle modal

  function toggleModal() {
    modalWrapper.classList.toggle("active"); //rajoute la class "active si elle n'y est pas et rajoute display block/none"
    firstModal.style.display = "block"; //remet la première modale en block après avoir fermé les deux modales
    secondModal.style.display = "none"; //seconde modal en none
  }
});

//deuxième modal
buttonFirstModal.addEventListener("click", openSecondModal); //ajout d'un gestionnaire d'évement qui exécute la fonction openSecondModal

function openSecondModal() {
  firstModal.style.display = "none"; //première modal en none
  secondModal.style.display = "block"; //seconde modal en block
}

//retourne à la première modal
arrow.addEventListener("click", backToFirstModal); //ajout d'un gestionnaire d'évement qui exécute la fonction backToFirstModal

function backToFirstModal() {
  firstModal.style.display = "block"; //première modal en block
  secondModal.style.display = "none"; //seconde modal en none
}
////////////////////////////////////////////

//affichage des works dans le première modal + des icone poubelle
async function displayWorkModal() {
  worksModal.innerHTML = ""; //vide le HTML
  const arrayModals = await getWork();
  arrayModals.forEach((works) => {
    const img = document.createElement("img");
    const figure = document.createElement("figure");
    //ajout de la class "trash" sur les SVG
    const trashIcon = `<svg class="trash" xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none"><path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/></svg>`;
    const div = document.createElement("div"); //parent des icônes poubelle
    div.innerHTML = trashIcon; // mise en place des icone dans le parent
    div.id = works.id; //récupère l'id des works sur les poubelles
    figure.appendChild(img);
    figure.appendChild(div);
    worksModal.appendChild(figure);
    img.src = works.imageUrl; //src = le format de la base de donnée
  });
  deleteWorks(); // display est une fonction async appeler deleteWorks ici permet d'attendre que les trash soit créer
}
displayWorkModal(); // affihce tous les work dans la modal

/////////////////////////////////////

//récupration de l'id des works
async function getWorkId() {
  const responseId = await fetch("http://localhost:5678/api/works");
  //retourne la liste des id
  return await responseId.json();
}
getWorkId();
/////////////////////////////////////

//gestion de "CASE" et du formulaire de la deuxième modal
//récupération de case
const contentAddImg = document.querySelector(".case");

// récupération du bouton qui permet de mettre une image
const addImgBtn = document.getElementById("add-img-btn");

//gestionnaire d'évenemtn sur le boutton d'ajout d'image
addImgBtn.addEventListener("input", () => {
  //on vérifie qu'un fichier est sélectionné
  if (addImgBtn.files.length > 0) {
    //récupération du fichier
    const selectedImage = addImgBtn.files[0];

    //vérifications de la taille de l'image (en octets)
    const maxSizeInBytes = 4 * 1024 * 1024; // 4 Mo
    if (selectedImage.size > maxSizeInBytes) {
      //récupération de la span pour afficher un message d'erreur image trop grande
      const errorSizeImg = document.getElementById(
        "message-erreur-taille-image"
      );
      //ajout du texte dans la span
      errorSizeImg.textContent =
        "La taille de l'image ne doit pas dépasser 4 mo.";
      //réinialisation du champs image
      addImgBtn.value = "";
    } else {
      //création d'un objet URL pour l'image sélectionné
      const selectedImageUrl = URL.createObjectURL(selectedImage);

      //création d'un élément image
      const previewImgSelected = document.createElement("img");
      //ajout de l'image sélectionné dans l'élément image créer
      previewImgSelected.src = selectedImageUrl;

      //vide "case" pour afficher l'image sélectionné
      contentAddImg.innerHTML = "";
      //mettre l'image sélectionné dans "case"
      contentAddImg.appendChild(previewImgSelected);
    }

    //catégories dynamique dans le formulaire d'envoie
    getCategories()
      .then((categories) => {
        const categorieSelect = document.getElementById("categorie");

        categories.forEach((category) => {
          //création des catégories
          const optionElement = document.createElement("option");
          optionElement.value = category.id;
          optionElement.textContent = category.name;

          //mettre les catégories des les options du formulaire
          categorieSelect.appendChild(optionElement);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Sélectionnez le bouton Valider
    const validerButton = document.getElementById("submitValider");

    //change la couleur du boutton valiser quand une image est sélestionné
    validerButton.style.backgroundColor = "#1d6154";
    validerButton.style.color = "white";
  }
});
////////////////////////////////////////////

//fonction add work
//récupération du champs titre
const titleChamp = document.getElementById(title);

//récupération du champs catégories
const selectCategoriesChamp = document.getElementById(categorie);

//récupération du bouton valider du formauilaire de la modal
const submitFormBtn = document.getElementById("submitValider");

//récupérer de la span "erreur un champ n'est pas remplie"
const erreurChampVide = document.getElementById("error-messageChamp");

function addWork() {
  submitFormBtn.addEventListener("submit", (event) => {
    // Création de l'objet FormData pour contenir les champs du formulaire
    const formData = new FormData();
    // Ajouter l'image sélectionnée
    formData.append("image", addImgBtn.files[0]);
    // Ajouter le titre
    formData.append("title", titleChamp.value.trim());

    // Ajouter la catégorie
    formData.append("category", selectCategoriesChamp.value);

    //vérifie si les champs sont vide et affiche le message d'erreur
    if (titleChamp === "" || selectCategoriesChamp === "" || addImgBtn === "") {
      erreurChampVide.textContent = "Un des champs est vide.";
      event.preventDefault(); // Empêche la soumission du formulaire
    } else {
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        //gestion de la réponse de la requête
        //vérifie si la réponse est ok (then)
        .then((response) => {
          //si la réponse est différente de ok
          if (!response.ok) {
            return response.json();
          } else {
            //génère une erreur si il ya un problème avec la requete
            throw new Error("Erreur lors de l'ajout de l'œuvre ");
          }
        })
        .then((data) => {
          console.log("Réponse de la requête : ", data);
          displayWorkModal();
          displayWorks();
        })
        //capture les erreur lors de la requete
        .catch((error) => {
          console.error(error);
        });
    }
  });
}

/////////////////////////////////////

//fonction DELETE work
function deleteWorks() {
  const id = getWorkId();
  console.log(id);
  const trashButon = document.querySelectorAll(".trash");
  trashButon.forEach((trashSVG) => {
    trashSVG.addEventListener("click", () => {
      const i = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch("http://localhost:5678/api/works/{$id}" + i)
        .then((respose) => {
          if (!respose.ok) {
            console.log("delete refuser");
            return respose.json();
          }
        })
        .then((data) => {
          console.log("delete ok:", data);
          displayWorkModal;
          displayWorks;
        });
    });
  });
}
deleteWorks();
//////////////////////////////////////
