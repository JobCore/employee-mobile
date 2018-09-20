/**
 * @param {string} id Id of the youtube video
 */
export const fetchVideoThumbNail =
  id => fetch(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)
