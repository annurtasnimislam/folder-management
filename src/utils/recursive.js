export const generateShortId = () => {
  const randomShortNumber = Math.floor(Math.random() * 10000);
  return String(randomShortNumber).padStart(4, "0");
};

export const findObject = (array, object) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === object.id) {
      return array[i];
    } else {
      const result = findObject(array[i].subfolders, object);
      if (result) {
        return result;
      }
    }
  }
};

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
