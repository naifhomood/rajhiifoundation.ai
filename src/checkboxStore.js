// Store for managing selected items
export const checkboxStore = {
  selectedItems: new Set(),

  addItem(item) {
    this.selectedItems.add(item);
  },

  removeItem(item) {
    this.selectedItems.delete(item);
  },

  getSelectedItems() {
    return Array.from(this.selectedItems);
  }
};