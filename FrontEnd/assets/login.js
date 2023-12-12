// Récupérer les références des éléments HTML
const email = document.getElementById("email");
const password = document.getElementById("mdp");
const form = document.querySelector("form");

// Ajouter un écouteur d'événements au formulaire
form.addEventListener("submit", async (event) => {
  // Empêche le comportement par défaut (rechargement de la page)
  event.preventDefault();

  // Récupération des valeurs des champs
  const userEmail = email.value;
  const userPassword = password.value;

  try {
    // Effectuer la requête pour obtenir le token
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //créer la requete http lors de l'"envoie au serveur grâce à POST"
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    // Vérifier si la requête a réussi
    if (response.ok) {
      // Récupérer le token à partir de la réponse JSON
      const data = await response.json();
      const token = data.token;

      // Redirection vers "modif.html" si la validation réussit
      window.location.href = "../index.html";

      // Enregistrer le token dans le localStorage
      localStorage.setItem("token", token);
    } else {
      // Afficher un message d'erreur en cas d'échec de la requête
      console.log("Erreur lors de la requête :", response.status);
      alert("Identifiants incorrects. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur inattendue :", error);
    alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
  }
});

// Fonction pour créer et ajouter dynamiquement le bouton "login" dans le menu
function createLoginButton() {
  // Créez l'élément du bouton
  const loginButton = document.createElement("li");
  loginButton.id = "loginButton";
  loginButton.textContent = "login"; // Le texte initial du bouton
  loginButton.addEventListener("click", redirectToLoginPage);

  // Récupérez l'élément de la liste de navigation
  const nav = document.querySelector("nav ul");

  // Récupérez les deux premiers éléments <li>
  const firstLi = nav.children[0];
  const secondLi = nav.children[1];

  // Ajoutez le bouton après les deux premiers éléments <li>
  nav.insertBefore(loginButton, secondLi.nextSibling);

  // Mettez à jour le contenu et le style du bouton en fonction de l'état de connexion initial
  updateLoginButton();
}

// Fonction pour vérifier l'état de connexion (à remplacer par votre propre logique de connexion)
function isLoggedIn() {
  // Remplacez ceci par votre logique de connexion
  return false;
}

// Fonction de gestionnaire de redirection vers la page login.html
function redirectToLoginPage() {
  // Redirection vers la page login.html
  window.location.href = "assets/login.html";
}

// Fonction pour mettre à jour le contenu et le style du bouton en fonction de l'état de connexion
function updateLoginButton() {
  const loginButton = document.getElementById("loginButton");

  if (isLoggedIn()) {
    loginButton.textContent = "logout";
    // Ajoutez des styles ou des classes CSS pour le bouton de déconnexion si nécessaire
  } else {
    loginButton.textContent = "login";
    // Ajoutez des styles ou des classes CSS pour le bouton de connexion si nécessaire
  }
}

// Appel initial pour créer le bouton au chargement de la page
document.addEventListener("DOMContentLoaded", createLoginButton);
