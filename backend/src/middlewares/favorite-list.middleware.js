async function createFavoriteListIfNotExists(req, res, next) {

  let favoriteList;
  const currentFavoriteList = await req.user.getFavorite_list();
  // console.log({ currentFavoriteList });
  favoriteList = currentFavoriteList;

  if(!currentFavoriteList) {
    favoriteList = await req.user.createFavorite_list();
    // console.log({ favoriteList });
  }

  req.favoriteList = favoriteList;
  return next();
}


module.exports = {
  createFavoriteListIfNotExists
}