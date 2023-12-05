// Modèle de vérification d'une adresse e-mail plus général
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

// Fonction pour valider l'email et le mot de passe
function validerEmailEtMotDePasse(email, password, motDePasseResponse) {
  // Validation de l'email
  const emailValide = emailRegex.test(email);

  // Validation du mot de passe en comparant avec celui de la réponse
  const motDePasseValide = password === "S0phie";

  // Retourne true si l'email et le mot de passe sont valides, sinon false
  return emailValide && motDePasseValide;
}

// Récupération des éléments du formulaire
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("mdp");
const form = document.querySelector("form");

// Gestionnaire d'événement lors de la soumission du formulaire
form.addEventListener("submit", async (event) => {
  // Empêche le comportement par défaut (rechargement de la page)
  event.preventDefault();

  // Récupération des valeurs des champs
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Effectuer la requête pour obtenir le token
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Vérifier si la requête a réussi
    if (response.ok) {
      // Récupérer le token à partir de la réponse JSON
      const data = await response.json();
      const token = data.token;
      const motDePasseResponse = data.password;

      // Vérifier l'email et le mot de passe
      if (validerEmailEtMotDePasse(email, password, motDePasseResponse)) {
        // Redirection vers "modif.html" si la validation réussit
        window.location.href = "modif.html";
        // Enregistrer le token dans sessionStorage
        window.sessionStorage.setItem("token", token);
      } else {
        console.log(
          "La validation a échoué. Veuillez vérifier vos informations."
        );
        alert("La validation a échoué. Veuillez vérifier vos informations.");
      }
    } else {
      // Afficher un message d'erreur en cas d'échec de la requête
      console.log("Erreur lors de la requête :", response.status);
      alert("Erreur lors de la requête. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur inattendue :", error);
    alert("Une erreur inattendue s'est produite. Veuillez réessayer.");
  }
});
