export const loadFromStorage = (key: string) => {
  try {
    const saveData= localStorage.getItem(key);

    if (saveData === null) {
      return undefined;
    }

    return JSON.parse(saveData);
  } catch (error) {
    return undefined;
  }
};

export function saveToStorage<T> (key: string, data: T) {
  const dataToBeSaved = JSON.stringify(data);
  localStorage.setItem(key, dataToBeSaved);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
