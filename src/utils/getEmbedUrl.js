export const isGoogleDriveFolder = (url) => {
  return url.includes('drive.google.com/drive/folders/');
};

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
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&iv_load_policy=3&disablekb=1`;
  }

  if (url.includes('drive.google.com')) {
    if (url.includes('/folders/')) {
      const folderId = url.split('/folders/')[1]?.split(/[/?#]/)[0];
      return `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
    }
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  if (url.includes('forms.office.com')) {
    return url.includes('&embed=true') ? url : url + '&embed=true';
  }

  return url;
};
