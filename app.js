const firebaseConfig = {
apiKey: "AIzaSyDBLxpmz1pCvix2l0mW-jAgMDea3E5muAI",
  authDomain: "paynreceive-b7ee9.firebaseapp.com",
  projectId: "paynreceive-b7ee9",
  storageBucket: "paynreceive-b7ee9.firebasestorage.app",
  messagingSenderId: "931007110605",
  appId: "1:931007110605:web:45b2a88445954acc263884",
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
