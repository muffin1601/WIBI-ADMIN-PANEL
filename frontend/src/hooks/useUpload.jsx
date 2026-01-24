export const uploadToCloudinary = async (files: File[], folder: string) => {
  const uploads = files.map(file => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "wibi_admin");

    return fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
      { method: "POST", body: form }
    ).then(res => res.json());
  });

  const results = await Promise.all(uploads);
  return results.map(r => r.secure_url);
};