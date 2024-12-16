export function createLoadingSpinner(message = 'جاري التحليل...') {
  const container = document.createElement('div');
  container.className = 'loading-container';
  
  container.innerHTML = `
    <div class="loading-spinner"></div>
    <p class="loading-message">${message}</p>
  `;
  
  return container;
}