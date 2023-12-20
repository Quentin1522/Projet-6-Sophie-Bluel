document.addEventListener("DOMContentLoaded", function () {
  // Récupérer les références des éléments HTML qui dépendent de l'état de connexion
  const editButton = document.getElementById("editButton"); // Bouton de modification
  const iconSvg = document.getElementById("iconSvg"); // Icône SVG
  const navList = document.querySelector("nav ul"); // Liste de navigation où les liens sont ajoutés

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

  function redirectToLoginPage() {
    window.location.href = "assets/login.html";
  }

  // Fonction pour vérifier si l'utilsateur est connecté
  function isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  function updateUI() {
    const loginLI = document.getElementById("loginLI"); // L'élément <li> pour le bouton de connexion/déconnexion

    if (isLoggedIn()) {
      loginLI.textContent = "logout";
      loginLI.removeEventListener("click", redirectToLoginPage);
      loginLI.addEventListener("click", logout);
      // Afficher le bouton de modification et l'icône
      if (editButton) editButton.style.display = "inline";
      if (iconSvg) iconSvg.style.display = "inline";
    } else {
      // Modifier le texte pour afficher "Login"
      loginLI.textContent = "login";
      loginLI.removeEventListener("click", logout);
      loginLI.addEventListener("click", redirectToLoginPage);

      // Masquer le bouton de modification et l'icône
      if (editButton) editButton.style.display = "none";
      if (iconSvg) iconSvg.style.display = "none";
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

  // Gestionnaire d'événement pour la soumission du formulaire
  function handleLoginSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email"); // Assurez-vous que l'ID est correct dans le HTML
    const passwordInput = document.getElementById("password"); // Assurez-vous que l'ID est correct dans le HTML

    const email = emailInput.value.trim(); // Ligne susceptible de générer l'erreur
    const password = passwordInput.value.trim(); // Ligne susceptible de générer l'erreur

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
        alert("Login failed. Please try again.");
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

document.addEventListener("DOMContentLoaded", function () {
  // Récupération de l'état de connexion
  const updateAuthenticationState = () => {
    const isAuthenticated = isLoggedIn();
    displayEditOptions(isAuthenticated);
    displayAuthenticationButton(isAuthenticated);
  };

  const displayEditOptions = (isAuthenticated) => {
    const editElements = document.getElementsByClassName("edit");
    for (const element of editElements) {
      element.style.display = isAuthenticated ? "inline" : "none";
    }
  };

  const displayAuthenticationButton = (isAuthenticated) => {
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    if (isAuthenticated) {
      loginButton.style.display = "none";
      logoutButton.style.display = "inline";
    } else {
      loginButton.style.display = "inline";
      logoutButton.style.display = "none";
    }
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Écouteur d'événement pour la soumission du formulaire de connexion
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = email.value;
    const password = passwordInput.value;

    // Supposons que l'API retourne un objet avec un token en cas de succès
    fetch("http://localhost:5678/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Sauvegarde du token dans le localStorage
        localStorage.setItem("token", data.token);
        updateAuthenticationState();
        // Redirection vers la page principale
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  });

  // Écouteur d'événement pour le bouton de déconnexion
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("token");
    updateAuthenticationState();
    // Redirection vers la page de connexion
    window.location.href = "login.html";
  });

  // Vérification initiale de l'état de connexion
  updateAuthenticationState();
});
