// Utility functions
export function createCheckboxItem(id, label) {
  const div = document.createElement('div');
  div.className = 'checkbox-item';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  
  div.appendChild(checkbox);
  div.appendChild(labelElement);
  
  return div;
}

export function createLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  return spinner;
}