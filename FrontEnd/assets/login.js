document.addEventListener("DOMContentLoaded", function () {
  // Récupérer les références des éléments HTML qui dépendent de l'état de connexion
  const navList = document.querySelector("nav ul"); // Liste dans laquelle figure login/logout

  // Fonction de gestionnaire de redirection vers la page login.html
  function redirectToLoginPage() {
    window.location.href = "assets/login.html";
  }

  // Fonction de déconnexion
  function logout() {
    localStorage.removeItem("token");
    updateUI();
    redirectToHomePage(true);
  }

  // Redirection vers la page d'accueil après déconnexion
  function redirectToHomePage(isLogout) {
    if (isLogout) window.location.href = "index.html";
    else window.location.href = "../index.html";
  }

  // Fonction pour vérifier si l'utilisateur est connecté
  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  function updateUI() {
    const loginLI = document.getElementById("loginLI"); // L'élément <li> pour le bouton de connexion/déconnexion

    if (isLoggedIn()) {
      loginLI.textContent = "logout";
      loginLI.removeEventListener("click", redirectToLoginPage);
      loginLI.addEventListener("click", logout);
    } else {
      // Modifier le texte pour afficher "Login"
      loginLI.textContent = "login";
      loginLI.removeEventListener("click", logout);
      loginLI.addEventListener("click", redirectToLoginPage);
    }
  }

  // Créer le bouton login/logout et l'ajouter à la navigation
  function createLoginLogoutButton() {
    const loginLI = document.createElement("li");
    loginLI.id = "loginLI";

    // Insérer le bouton avant le dernier élément de 'navList' si 'navList' a plus d'un enfant
    if (navList.children.length > 1) {
      // L'avant-dernier emplacement est juste avant le dernier enfant
      const lastLi = navList.lastElementChild;
      navList.insertBefore(loginLI, lastLi);
    } else {
      // S'il n'y a qu'un seul enfant ou aucun, simplement ajouter à la fin
      navList.append(loginLI);
    }

    updateUI(); // Mettre à jour l'état immédiatement après la création
  }

  // Gestionnaire d'événement pour la soumission du formulaire de connexion
  function handleLoginSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        updateUI();
        redirectToHomePage(false);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Erreur dans l’identifiant ou le mot de passe.");
      });
  }

  // Attacher l'événement de soumission au formulaire de connexion, s'il est présent
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  // Initialiser le bouton de connexion/déconnexion à partir de l'état de stockage local
  createLoginLogoutButton();
});
