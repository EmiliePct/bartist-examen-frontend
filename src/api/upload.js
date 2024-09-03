// fonction pour l'upload de photo de profil d'un utilisateur
export const uploadProfilePicture = async (event, token, isVenue) => {
  // Récupération du fichier
  const file = event.target.files[0];
  
  try {
      // Création d'un objet FormData pour envoyer les données du fichier
    const formData = new FormData();
      // Ajout du fichier à l'objet FormData sous le nom 'image'
     formData.append('image', file);
     formData.append('token', token);
     formData.append('isVenue', isVenue);
     console.log("formData", formData)
    const response = await fetch('http://localhost:3000/medias/uploadProfilePicture', {
      method: 'POST',
      body:
        formData,
    })
    if (response) {
      const data = await response.json();
      console.log('Fichier upload :', data);
      return data;
    } else {
      console.error('Erreur upload');
    }
  } catch (error) {
    console.error(error);
  }
};
