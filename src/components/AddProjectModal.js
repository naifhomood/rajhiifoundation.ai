import { projects } from '../data/projects.js';
import { createProjectCard } from './ProjectCard.js';

function attachProjectListeners(card, project) {
  const checkbox = card.querySelector(`#project-${project.id}`);
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!window.selectedProjects.has(project)) {
          window.selectedProjects.add(project);
        }
      } else {
        window.selectedProjects.delete(project);
      }
      
      const count = window.selectedProjects.size;
      const selectedCountElement = document.querySelector('#selected-count');
      const analyzeButton = document.querySelector('#analyzeWithAI');
      
      if (selectedCountElement && analyzeButton) {
        selectedCountElement.textContent = count > 0 ? `(${count})` : '';
        analyzeButton.disabled = count === 0;
      }
    });
  }
}

let selectedProjects = new Set();

function updateSelectedCount() {
  const count = selectedProjects.size;
  const selectedCountElement = document.querySelector('#selected-count');
  const analyzeButton = document.querySelector('#analyzeWithAI');
  
  if (selectedCountElement && analyzeButton) {
    selectedCountElement.textContent = count > 0 ? `(${count})` : '';
    analyzeButton.disabled = count === 0;
  }
}

export function createAddProjectModal(customInstructions) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'addProjectModal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>إضافة مشروع جديد</h2>
      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="paste">لصق من الجدول</button>
        <button class="tab-btn" data-tab="manual">إدخال يدوي</button>
      </div>
      
      <div class="tab-content" id="paste-tab">
        <div class="form-group">
          <label for="pasteArea">الصق بيانات المشروع من الجدول هنا</label>
          <textarea id="pasteArea" rows="10" placeholder="الصق بيانات المشروع هنا..."></textarea>
        </div>
        <button type="button" class="submit-btn" id="processPasteBtn">إضافة المشروع</button>
      </div>

      <form id="addProjectForm" class="tab-content" style="display: none;">
        <div class="form-grid">
          <div class="form-group">
            <label for="projectName">
              <i class="fas fa-project-diagram"></i>
              اسم المشروع
            </label>
            <input type="text" id="projectName" placeholder="أدخل اسم المشروع" required>
          </div>
          
          <div class="form-group">
            <label for="organization">
              <i class="fas fa-building"></i>
              المنظمة
            </label>
            <input type="text" id="organization" placeholder="اسم المنظمة المنفذة" required>
          </div>
          
          <div class="form-group">
            <label for="category">
              <i class="fas fa-tag"></i>
              الفئة
            </label>
            <input type="text" id="category" placeholder="فئة المشروع" required>
          </div>
          
          <div class="form-group">
            <label for="location">
              <i class="fas fa-map-marker-alt"></i>
              الموقع
            </label>
            <input type="text" id="location" placeholder="موقع تنفيذ المشروع" required>
          </div>
          
          <div class="form-group currency-input">
            <label for="budget">
              <i class="fas fa-coins"></i>
              الميزانية
            </label>
            <input type="number" id="budget" placeholder="0" required>
          </div>
          
          <div class="form-group number-input">
            <label for="beneficiaries">
              <i class="fas fa-users"></i>
              عدد المستفيدين
            </label>
            <input type="number" id="beneficiaries" placeholder="0" required>
          </div>
          
          <div class="form-group">
            <label for="targetGroup">
              <i class="fas fa-bullseye"></i>
              الفئة المستهدفة
            </label>
            <input type="text" id="targetGroup" placeholder="الفئة المستهدفة من المشروع" required>
          </div>
          
          <div class="form-group number-input">
            <label for="duration">
              <i class="fas fa-calendar-alt"></i>
              المدة (بالأيام)
            </label>
            <input type="number" id="duration" placeholder="0" required>
          </div>
          
          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="description">
              <i class="fas fa-align-left"></i>
              الوصف
            </label>
            <textarea id="description" placeholder="وصف تفصيلي للمشروع" rows="4"></textarea>
          </div>
          
          <div class="form-group">
            <label for="contactPerson">
              <i class="fas fa-user"></i>
              جهة الاتصال
            </label>
            <input type="text" id="contactPerson" placeholder="اسم الشخص المسؤول">
          </div>
          
          <div class="form-group">
            <label for="phone">
              <i class="fas fa-phone"></i>
              رقم الهاتف
            </label>
            <input type="tel" id="phone" placeholder="05xxxxxxxx" pattern="[0-9]{10}">
          </div>
        </div>
        
        <button type="submit" class="submit-btn">
          <i class="fas fa-plus-circle"></i>
          إضافة المشروع
        </button>
      </form>
    </div>
  `;

  // Add event listeners
  const closeBtn = modal.querySelector('.close');
  closeBtn.onclick = () => modal.style.display = 'none';

  // Tab switching
  const tabBtns = modal.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show/hide appropriate content
      const tabName = btn.dataset.tab;
      if (tabName === 'paste') {
        modal.querySelector('#paste-tab').style.display = 'block';
        modal.querySelector('#addProjectForm').style.display = 'none';
      } else {
        modal.querySelector('#paste-tab').style.display = 'none';
        modal.querySelector('#addProjectForm').style.display = 'block';
      }
    };
  });

  // Process pasted data
  const processPasteBtn = modal.querySelector('#processPasteBtn');
  processPasteBtn.onclick = () => {
    try {
      const pastedText = modal.querySelector('#pasteArea').value;
      
      // Remove first line if it contains "عدد النتائج"
      const lines = pastedText.split('\n')
        .filter(line => line.trim() && !line.includes('عدد النتائج'));
      
      lines.forEach((line, index) => {
        const values = line.split('\t').map(val => val.trim());
        
        try {
          const newProject = {
            id: parseInt(values[0]) || Math.floor(Math.random() * 100000),
            name: values[1] || '',
            organization: values[2] || '',
            category: values[3] || '',
            location: `${values[6]} - ${values[7]}`,
            budget: parseInt(values[10]?.replace(/[,\s]/g, '')) || 0,
            beneficiaries: parseInt(values[14]) || 0,
            targetGroup: values[15] || '',
            duration: parseInt(values[17]) || 0,
            description: values[18] || '',
            contact: values[20] || '',
            phone: values[21]?.replace(/[^\d]/g, '') || ''
          };

          if (newProject.name && newProject.organization) {
            projects.push(newProject);
            const projectsContainer = document.querySelector('#projects-list');
            if (projectsContainer) {
              const newCard = createProjectCard(newProject, customInstructions);
              attachProjectListeners(newCard, newProject);
              projectsContainer.appendChild(newCard);
            }
          }
        } catch (err) {
          console.error(`خطأ في معالجة المشروع ${index + 1}:`, err);
        }
      });

      modal.querySelector('#pasteArea').value = '';
      modal.style.display = 'none';
    } catch (err) {
      console.error('خطأ في معالجة البيانات:', err);
      alert('حدث خطأ أثناء معالجة البيانات. يرجى التأكد من صحة التنسيق والمحاولة مرة أخرى.');
    }
  };

  // Close modal when clicking outside
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  // Manual form submission
  const form = modal.querySelector('#addProjectForm');
  form.onsubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Math.floor(Math.random() * 100000),
      name: document.getElementById('projectName').value,
      organization: document.getElementById('organization').value,
      category: document.getElementById('category').value,
      location: document.getElementById('location').value,
      budget: Number(document.getElementById('budget').value),
      beneficiaries: Number(document.getElementById('beneficiaries').value),
      targetGroup: document.getElementById('targetGroup').value,
      duration: Number(document.getElementById('duration').value),
      description: document.getElementById('description').value,
      contact: document.getElementById('contactPerson').value,
      phone: document.getElementById('phone').value
    };

    projects.push(newProject);
    const projectsContainer = document.querySelector('#projects-list');
    if (projectsContainer) {
      const newCard = createProjectCard(newProject, customInstructions);
      attachProjectListeners(newCard, newProject);
      projectsContainer.appendChild(newCard);
    }

    form.reset();
    modal.style.display = 'none';
  };

  return modal;
}

export function showAddProjectModal() {
  const modal = document.getElementById('addProjectModal');
  if (modal) {
    modal.style.display = 'block';
  }
}
