export const buildDiaryCreateFormData = (imageUris: string[]): FormData => {
  const formData = new FormData();

  const entryDate = new Date().toISOString().slice(0, 10);
  formData.append('entryDate', entryDate);

  imageUris.forEach((uri, index) => {
    formData.append('photos', {
      uri,
      name: `photo${index}.jpg`,
      type: 'image/jpeg',
    });
  });

  return formData;
};
