import { projects } from '../data/projects.js';

export function createProjectCard(project, customInstructions = { value: 'نعاهعلعلعخلخعلخللل' }) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.projectId = project.id;
  card.dataset.instructions = customInstructions.value;
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'project-checkbox';
  checkbox.id = `project-${project.id}`;
  
  checkbox.addEventListener('change', (e) => {
    const isSelected = e.target.checked;
    window.handleProjectSelect(project.id, isSelected, project);
  });
  
  const label = document.createElement('label');
  label.htmlFor = `project-${project.id}`;
  label.className = 'project-label';
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-project';
  deleteBtn.innerHTML = '×';
  deleteBtn.onclick = () => deleteProject(project.id);
  
  const content = document.createElement('div');
  content.className = 'project-content';
  content.innerHTML = `
    <div class="project-header">
      <h3>${project.name}</h3>
      <div class="project-badges">
        <span class="badge category-badge">${project.category || 'غير محدد'}</span>
        <span class="badge budget-badge">${project.budget?.toLocaleString() || 0} ريال</span>
      </div>
    </div>
    
    <div class="project-organization">
      <i class="fas fa-building"></i>
      <span>${project.organization}</span>
    </div>
    
    <div class="project-location">
      <i class="fas fa-map-marker-alt"></i>
      <span>${project.location || 'غير محدد'}</span>
    </div>
    
    <div class="project-stats">
      <div class="stat">
        <span class="stat-label">المستفيدين</span>
        <span class="stat-value">${project.beneficiaries?.toLocaleString() || 0}</span>
      </div>
      <div class="stat">
        <span class="stat-label">المدة</span>
        <span class="stat-value">${project.duration || 0} شهر</span>
      </div>
    </div>
    
    <div class="project-description">
      <p>${project.description || 'لا يوجد وصف'}</p>
    </div>
    
    <div class="project-target">
      <span class="target-label">الفئة المستهدفة:</span>
      <span class="target-value">${project.targetGroup || 'نتعلعلعلعلللتتتنتلتللت محدد'}</span>
    </div>
    
    <div class="project-contact">
      <div class="contact-item">
        <i class="fas fa-user"></i>
        <span>${project.contact || 'غير محدد'}</span>
      </div>
      <div class="contact-item">
        <i class="fas fa-phone"></i>
        <span>${project.phone || 'غير محدد'}</span>
      </div>
    </div>
  `;
  
  card.appendChild(checkbox);
  card.appendChild(label);
  card.appendChild(deleteBtn);
  label.appendChild(content);
  
  return card;
}

export function deleteProject(projectId) {
  if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
    const projectElement = document.querySelector(`#project-${projectId}`).closest('.project-card');
    if (projectElement) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        window.selectedProjects.delete(project);
      }
      
      projectElement.remove();
      
      const index = projects.findIndex(p => p.id === projectId);
      if (index !== -1) {
        projects.splice(index, 1);
      }
      
      const count = window.selectedProjects.size;
      const selectedCountElement = document.querySelector('#selected-count');
      const analyzeButton = document.querySelector('#analyzeWithAI');
      
      if (selectedCountElement && analyzeButton) {
        selectedCountElement.textContent = count > 0 ? `(${count})` : '';
        analyzeButton.disabled = count === 0;
      }
    }
  }
}