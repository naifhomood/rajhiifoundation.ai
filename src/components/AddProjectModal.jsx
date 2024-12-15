import { projects } from '../data/projects.js';
import { createProjectCard } from './ProjectCard.js';
import SuggestionButtons from './SuggestionButtons';

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

export function createAddProjectModal() {
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
        <div class="form-group">
          <label for="projectName">اسم المشروع</label>
          <input type="text" id="projectName" required>
        </div>
        <div class="form-group">
          <label for="organization">المنظمة</label>
          <input type="text" id="organization" required>
        </div>
        <div class="form-group">
          <label for="category">الفئة</label>
          <input type="text" id="category" required>
        </div>
        <div class="form-group">
          <label for="location">الموقع</label>
          <input type="text" id="location" required>
        </div>
        <div class="form-group">
          <label for="budget">الميزانية</label>
          <input type="number" id="budget" required>
        </div>
        <div class="form-group">
          <label for="beneficiaries">عدد المستفيدين</label>
          <input type="number" id="beneficiaries" required>
        </div>
        <div class="form-group">
          <label for="targetGroup">الفئة المستهدفة</label>
          <input type="text" id="targetGroup" required>
        </div>
        <div class="form-group">
          <label for="duration">المدة (بالأيام)</label>
          <input type="number" id="duration" required>
        </div>
        <div class="form-group">
          <label for="description">الوصف</label>
          <textarea id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="contact">جهة الاتصال</label>
          <input type="text" id="contact" required>
        </div>
        <div class="form-group">
          <label for="phone">رقم الهاتف</label>
          <input type="tel" id="phone" required>
        </div>
        <div class="form-group">
          <label>توجيهات للتحليل:</label>
          <SuggestionButtons id="suggestion-buttons" />
          <textarea
            id="ai-prompt"
            placeholder="اكتب هنا توجيهاتك للتحليل..."
            rows={4}
            style="width: 100%; margin-bottom: 1rem;"
          />
        </div>
        <button type="submit" class="submit-btn">إضافة المشروع</button>
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
              const newCard = createProjectCard(newProject);
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
      contact: document.getElementById('contact').value,
      phone: document.getElementById('phone').value,
      aiPrompt: document.getElementById('ai-prompt').value
    };

    projects.push(newProject);
    const projectsContainer = document.querySelector('#projects-list');
    if (projectsContainer) {
      const newCard = createProjectCard(newProject);
      attachProjectListeners(newCard, newProject);
      projectsContainer.appendChild(newCard);
    }

    form.reset();
    modal.style.display = 'none';
  };

  const suggestionButtons = modal.querySelector('#suggestion-buttons');
  suggestionButtons.addEventListener('suggestion-click', (e) => {
    const aiPromptInput = modal.querySelector('#ai-prompt');
    aiPromptInput.value = e.detail.prompt;
  });

  return modal;
}

export function showAddProjectModal() {
  const modal = document.getElementById('addProjectModal');
  if (modal) {
    modal.style.display = 'block';
  }
}
