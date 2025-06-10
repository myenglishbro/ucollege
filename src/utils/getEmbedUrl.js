// utils/getEmbedUrl.js

export const getEmbedUrl = (url) => {
  if (url.includes('wordwall.net')) {
    return url.replace(
      'https://wordwall.net/play/',
      'https://wordwall.net/embed/play/'
    );
  }

  if (url.includes('youtu.be') || url.includes('youtube.com')) {
    const videoId =
      url.split('v=')[1]?.split('&')[0] ||
      url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes('drive.google.com')) {
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  if (url.includes('forms.office.com')) {
    return url.includes('&embed=true') ? url : url + '&embed=true';
  }

  return url;
};
