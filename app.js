// Configuration Firebase (remplace par tes vrais identifiants plus tard)
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_ID_MESSAGERIE",
  appId: "TON_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function checkStatus() {
  const code = document.getElementById("trackingCode").value.trim();
  const resultDiv = document.getElementById("result");

  if (!code) {
    resultDiv.innerText = "Veuillez entrer un code valide.";
    return;
  }

  db.collection("colis").doc(code).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        resultDiv.innerText = `Statut : ${data.statut} | Destination : ${data.destination}`;
      } else {
        resultDiv.innerText = "Code introuvable. Vérifiez votre code.";
      }
    })
    .catch(error => {
      resultDiv.innerText = "Erreur de connexion.";
      console.error("Erreur :", error);
    });
}
