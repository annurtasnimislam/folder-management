export const findFolder = (array, object) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === object.id) {
      return array[i].subfolders;
    } else {
      const result = findFolder(array[i].subfolders, object);
      if (result) {
        return result;
      }
    }
  }
  return [];
};

export const folderReplace = (array, object) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === object.id) {
      array[i] = object;
      return array;
    } else {
      const result = folderReplace(array[i].subfolders, object);
      if (result) {
        array[i].subfolders = result;
        return array;
      }
    }
  }
  return [];
};

export const deleteFolder = (array, object) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === object.id) {
      array.splice(i, 1);
    } else {
      deleteFolder(array[i].subfolders, object);
    }
  }
};
