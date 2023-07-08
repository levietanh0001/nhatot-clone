

function getMagicMethods(model) {
  
  for (let assoc of Object.keys(model.associations)) {
    for (let accessor of Object.keys(model.associations[assoc].accessors)) {
      console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
    }
  }
}

module.exports = {
  getMagicMethods
}