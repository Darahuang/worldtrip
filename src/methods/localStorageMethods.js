const localStorageMethods = {
  save(item) {
    const itemString = JSON.stringify(item);
    localStorage.setItem('favorite', itemString);
  },
  get() {
    return JSON.parse(localStorage.getItem('favorite'));
  },
};
export default localStorageMethods;
