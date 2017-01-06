module.exports = function(text) {

  const findPopulate = (obj, level, index = 1) => {
    if (level === index || !obj.populate)
      return obj;
    return findPopulate(obj.populate, level, index + 1);
  }

  const splitted = text.split('.');

  return splitted
    .map((item, index, list) => {
      if (index + 1 === list.length)
        return { path: item };
      else
        return { path: item, populate: {} };
    })
    .reduce((mem, curr, index) => {
      const populate = findPopulate(mem, index);
      populate.populate = curr;
      return mem;
    });
}
