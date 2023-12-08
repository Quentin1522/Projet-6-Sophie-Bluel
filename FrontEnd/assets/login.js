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
      window.location.href = "modif.html";

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
