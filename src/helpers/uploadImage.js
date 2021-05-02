export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dgq0tyl3s/image/upload',
    {
      method: 'POST',
      body: formData,
    }
  );
  if (!res.ok) throw new Error('Error al cargar la imagen.');
  const data = await res.json();

  return data.secure_url;
};
