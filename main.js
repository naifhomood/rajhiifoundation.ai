import './style.css';
import { createProjectCard } from './src/components/ProjectCard.js';
import { createAddProjectModal, showAddProjectModal } from './src/components/AddProjectModal.js';
import { processItemsWithAI } from './src/aiService.js';
import { createLoadingSpinner } from './src/components/LoadingSpinner.js';
import { createAnalysisControls } from './src/components/AnalysisControls.js';

let chart = null;

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="header">
      <h1>المشاريع المتاحة للتحليل</h1>
      <div class="header-buttons">
        <button id="selectAllBtn" class="select-all-btn">
          <i class="fas fa-check-square"></i>
          <span>تحديد الكل</span>
        </button>
        <button id="deselectAllBtn" class="deselect-all-btn">
          <i class="fas fa-square"></i>
          <span>إلغاء التحديد</span>
        </button>
        <button id="deleteSelectedBtn" class="delete-selected-btn">
          <i class="fas fa-trash-alt"></i>
          <span>حذف المحدد</span>
        </button>
        <button id="addProjectBtn" class="add-project-btn">
          <i class="fas fa-plus-circle"></i>
          <span>إضافة مشروع</span>
        </button>
      </div>
    </div>
    
    <div class="visualization-section">
      <div class="chart-container">
        <canvas id="projectChart"></canvas>
      </div>
      
      <div id="stats-box" class="stats-box">
        <h3>إحصائيات المشاريع المختارة</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <i class="fas fa-project-diagram"></i>
            <span>عدد المشاريع: </span>
            <span id="total-projects">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>إجمالي التكلفة: </span>
            <span id="total-budget">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <span>إجمالي المستفيدين: </span>
            <span id="total-beneficiaries">0</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-clock"></i>
            <span>متوسط المدة: </span>
            <span id="avg-duration">0</span>
          </div>
        </div>
 
      </div>
    </div>
    
    <div id="projects-list" class="projects-list"></div>
    <div id="analysis-section" class="analysis-section">
      <div id="controls-container"></div>
      <div class="button-group">
        <button id="analyzeWithAI" class="ai-button" disabled>
          <span>تحليل المشاريع المختارة</span>
          <span id="selected-count"></span>
        </button>
      </div>

         <div class="stats-actions">
          <button id="copyAnalysisBtn" class="action-btn">
            <i class="fas fa-copy"></i>
            نسخ التحليل
          </button>
          <button id="downloadReportBtn" class="action-btn">
            <i class="fas fa-download"></i>
            تحميل التقرير
          </button>
        </div>
      <div id="result" class="result"></div>
    </div>
  </div>
  
`;

// إعداد الرسم البياني
function setupChart() {
  const ctx = document.getElementById('projectChart').getContext('2d');
  
  // تعريف التدرجات اللونية
  const gradientFill1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill1.addColorStop(0, 'rgba(46, 204, 113, 0.2)');
  gradientFill1.addColorStop(1, 'rgba(46, 204, 113, 0.0)');

  const gradientFill2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradientFill2.addColorStop(0, 'rgba(52, 152, 219, 0.2)');
  gradientFill2.addColorStop(1, 'rgba(52, 152, 219, 0.0)');

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '💰 تكلفة المشاريع',
          data: [],
          backgroundColor: gradientFill1,
          borderColor: 'rgba(46, 204, 113, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointStyle: '💰',
          pointRadius: 12,
          pointHoverRadius: 15,
          yAxisID: 'y'
        },
        {
          label: '👥 عدد المستفيدين',
          data: [],
          backgroundColor: gradientFill2,
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointStyle: '👥',
          pointRadius: 12,
          pointHoverRadius: 15,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        title: {
          display: true,
          text: '📊 تحليل المشاريع: التكلفة وعدد المستفيدين',
          font: {
            size: 20,
            family: 'Cairo',
            weight: 'bold'
          },
          padding: 20,
          color: '#2c3e50'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              family: 'Cairo',
              size: 14
            },
            usePointStyle: true,
            pointStyle: (context) => {
              return context.datasetIndex === 0 ? '💰' : '👥';
            },
            padding: 20
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            family: 'Cairo'
          },
          bodyFont: {
            family: 'Cairo'
          },
          rtl: true,
          padding: 12
        },
        datalabels: {
          display: true,
          backgroundColor: function(context) {
            return context.dataset.borderColor.replace('1)', '0.9)');
          },
          borderRadius: 4,
          color: 'white',
          font: {
            family: 'Cairo',
            size: 12,
            weight: 'bold'
          },
          padding: {
            top: 6,
            bottom: 6,
            left: 10,
            right: 10
          },
          formatter: function(value, context) {
            const formatter = new Intl.NumberFormat('ar-SA', {
              notation: 'standard',
              maximumFractionDigits: 0
            });
            
            if (context.datasetIndex === 0) { // تكلفة المشاريع
              return formatter.format(value) + ' ريال';
            } else { // عدد المستفيدين
              return formatter.format(value);
            }
          },
          anchor: 'end',
          align: 'top',
          offset: 10,
          textAlign: 'center'
        }
      },
      elements: {
        point: {
          radius: 12,
          hoverRadius: 15,
          borderWidth: 0
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '⏱️ مدة التنفيذ (بالأشهر)',
            font: {
              family: 'Cairo',
              size: 14,
              weight: 'bold'
            },
            padding: 10,
            color: '#2c3e50'
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
          ticks: {
            font: {
              family: 'Cairo',
              size: 12
            }
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '💰 التكلفة (بالريال)',
            font: {
              family: 'Cairo',
              size: 14,
              weight: 'bold'
            },
            padding: 10,
            color: '#2c3e50'
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
          ticks: {
            font: {
              family: 'Cairo',
              size: 12
            },
            callback: function(value) {
              return value.toLocaleString() + ' ريال';
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '👥 عدد المستفيدين',
            font: {
              family: 'Cairo',
              size: 14,
              weight: 'bold'
            },
            padding: 10,
            color: '#2c3e50'
          },
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Cairo',
              size: 12
            },
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

// تحديث الرسم البياني
function updateChart() {
  if (!chart) return;

  // ترتيب المشاريع المحددة حسب المدة
  const sortedProjects = Array.from(window.selectedProjects)
    .sort((a, b) => parseInt(a.duration) - parseInt(b.duration));

  // تحضير البيانات للرسم البياني
  const labels = sortedProjects.map(project => project.duration + ' شهر');
  const costValues = sortedProjects.map(project => parseInt(project.budget));
  const beneficiaryValues = sortedProjects.map(project => parseInt(project.beneficiaries || 0));
  
  // تحديث البيانات
  chart.data.labels = labels;
  chart.data.datasets[0].data = costValues;
  chart.data.datasets[1].data = beneficiaryValues;

  // تحديث خيارات tooltip
  chart.options.plugins.tooltip = {
    ...chart.options.plugins.tooltip,
    callbacks: {
      title: function(tooltipItems) {
        const project = sortedProjects[tooltipItems[0].dataIndex];
        return '📋 ' + project.name;
      },
      label: function(context) {
        const project = sortedProjects[context.dataIndex];
        if (context.dataset.label.includes('تكلفة')) {
          return [
            '💰 التكلفة: ' + new Intl.NumberFormat('ar-SA').format(context.raw) + ' ريال',
            '⏱️ المدة: ' + project.duration + ' شهر'
          ];
        } else {
          return '👥 المستفيدين: ' + new Intl.NumberFormat('ar-SA').format(context.raw);
        }
      }
    }
  };

  // تحديث عنوان محور X
  chart.options.scales.x.title = {
    display: true,
    text: 'المدة (بالأشهر)',
    font: {
      family: 'Cairo',
      size: 14,
      weight: 'bold'
    }
  };
  
  chart.update('default');
  updateStats();
}

// Create a global Set for selected projects
window.selectedProjects = new Set();
const projectsList = document.getElementById('projects-list');
const resultDiv = document.getElementById('result');
const analyzeButton = document.getElementById('analyzeWithAI');
const selectedCountSpan = document.getElementById('selected-count');
const controlsContainer = document.getElementById('controls-container');

// Initialize empty projects array
let projects = [];

function updateSelectedCount() {
  const count = window.selectedProjects.size;
  selectedCountSpan.textContent = count > 0 ? `(${count})` : '';
  analyzeButton.disabled = count === 0;
  updateChart();
}

// جعل handleProjectSelect متاحًا عالميًا
window.handleProjectSelect = function(projectId, isSelected, project) {
  console.log('Project selected:', project); // للتشخيص
  if (isSelected) {
    window.selectedProjects.add(project);
  } else {
    window.selectedProjects.delete(project);
  }
  updateSelectedCount();
}

function initializeProjects() {
  projects.forEach(project => {
    const card = createProjectCard(project);
    projectsList.appendChild(card);
  });

  // Add project button click handler
  document.getElementById('addProjectBtn').addEventListener('click', () => {
    const modal = createAddProjectModal();
    document.body.appendChild(modal);
    showAddProjectModal();
  });
}

// Initialize chart and projects
setupChart();
initializeProjects();

// Add analysis controls
controlsContainer.appendChild(createAnalysisControls());

const customInstructions = document.getElementById('customInstructions');

// Handle AI analysis
analyzeButton.addEventListener('click', async () => {
  if (window.selectedProjects.size === 0) {
    resultDiv.innerHTML = `
      <div class="error-message">
        يرجى اختيار مشروع واحد على الأقل للتحليل
      </div>
    `;
    return;
  }

  // Show loading state
  resultDiv.innerHTML = '';
  resultDiv.appendChild(createLoadingSpinner('جاري تحليل المشاريع المختارة...'));
  analyzeButton.disabled = true;

  try {
    console.log('Selected projects:', window.selectedProjects.size);
    const selectedProjectsArray = Array.from(window.selectedProjects);
    const defaultInstructions = ' يالاضافة الى قم بتحليل المشاريع المقدمة وفقاً للمعايير والقيم الأساسية لمؤسسة عبدالله بن عبدالعزيز الراجحي الخيرية. المؤسسة هي جهة أهلية مانحة تهدف إلى خدمة المجتمع من خلال دعم وتمويل المشاريع التنموية المقدمة من المنظمات غير الربحية.ركز التحليل على تقديم توصيات عملية ومحددة تُسهم في تحسين المشروع ليتماشى مع القيم التالية: العمل التشاركي الاستدامة الريادة الابتكار والاحترافية في حال نقص المعلومات المطلوبة في المشروع، قدّم توصيات لسد هذه الفجوات وتعزيز توافق المشروع مع أهداف المؤسسة الخيرية مع تضمين ملاحظات وتوصيات إضافية لموظفي المنح تساعدهم في متابعة تنفيذ المشاريع، الإشراف عليها، تقييم التقارير، وضمان صرف الدفعات وفق المعايير المحددة بما يحقق أهداف المؤسسة.';
    const instructions = `${customInstructions.value || ''} ${defaultInstructions}`;
    console.log('Instructions used for analysis:', instructions);
    
    const analysis = await processItemsWithAI(selectedProjectsArray, instructions);
    resultDiv.innerHTML = `<div class="analysis-result">${analysis}</div>`;
  } catch (error) {
    console.error('Analysis error:', error);
    resultDiv.innerHTML = `
      <div class="error-message">
        ${error.message}
      </div>
    `;
  } finally {
    analyzeButton.disabled = window.selectedProjects.size === 0;
  }
});

// دالة تحديد/إلغاء تحديد كل المشاريع
function toggleSelectAll() {
  const checkboxes = document.querySelectorAll('.project-checkbox');
  const selectAllBtn = document.getElementById('selectAllBtn');
  const isSelectAll = selectAllBtn.classList.toggle('active');
  
  checkboxes.forEach(checkbox => {
    // تحديث حالة الـ checkbox
    checkbox.checked = isSelectAll;
    
    // تفعيل الـ change event يدوياً
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    checkbox.dispatchEvent(event);
  });
  
  updateSelectedCount();
}

// دالة إلغاء تحديد جميع المشاريع
function deselectAll() {
  const checkboxes = document.querySelectorAll('.project-checkbox');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.checked = false;
      const event = new Event('change', {
        bubbles: true,
        cancelable: true,
      });
      checkbox.dispatchEvent(event);
    }
  });
  
  document.getElementById('selectAllBtn').classList.remove('active');
  updateSelectedCount();
}

// دالة حذف المشاريع المحددة
function deleteSelectedProjects() {
  if (window.selectedProjects.size === 0) return;
  
  if (confirm('هل أنت متأكد من حذف المشاريع المحددة؟')) {
    const selectedIds = Array.from(window.selectedProjects).map(p => p.id);
    
    // حذف المشاريع من المصفوفة
    selectedIds.forEach(id => {
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) {
        projects.splice(index, 1);
      }
      
      // حذف بطاقة المشروع من واجهة المستخدم
      const projectCard = document.querySelector(`.project-card[data-project-id="${id}"]`);
      if (projectCard) {
        projectCard.remove();
      }
    });
    
    // إفراغ مجموعة المشاريع المحددة
    window.selectedProjects.clear();
    updateSelectedCount();
    updateChart();
  }
}

// إضافة دالة تحديث الإحصائيات
function updateStats() {
  const projects = Array.from(window.selectedProjects);
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => sum + parseInt(p.budget), 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + parseInt(p.beneficiaries || 0), 0);
  const avgDuration = totalProjects > 0 
    ? Math.round(projects.reduce((sum, p) => sum + parseInt(p.duration), 0) / totalProjects) 
    : 0;

  // تحديث العناصر
  document.getElementById('total-projects').textContent = totalProjects;
  document.getElementById('total-budget').textContent = new Intl.NumberFormat('ar-SA').format(totalBudget) + ' ريال';
  document.getElementById('total-beneficiaries').textContent = new Intl.NumberFormat('ar-SA').format(totalBeneficiaries);
  document.getElementById('avg-duration').textContent = avgDuration + ' شهر';
}

// إضافة دوال النسخ والتحميل
async function downloadReport() {
  const projects = Array.from(window.selectedProjects);
  const totalProjects = projects.length;
  const totalBudget = new Intl.NumberFormat('ar-SA').format(
    projects.reduce((sum, p) => sum + parseInt(p.budget), 0)
  );
  const totalBeneficiaries = new Intl.NumberFormat('ar-SA').format(
    projects.reduce((sum, p) => sum + parseInt(p.beneficiaries || 0), 0)
  );
  const avgDuration = totalProjects > 0
    ? Math.round(projects.reduce((sum, p) => sum + parseInt(p.duration), 0) / totalProjects)
    : 0;

  // الحصول على نص التحليل من textarea
  const analysisTextarea = document.getElementById('analysis-text');
  const analysisContent = analysisTextarea ? analysisTextarea.value : 'لم يتم العثور على نتائج التحليل';

  const reportContent = `تقرير المشاريع المختارة
تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}

ملخص الإحصائيات:
=================
• عدد المشاريع: ${totalProjects}
• إجمالي التكلفة: ${totalBudget} ريال
• إجمالي المستفيدين: ${totalBeneficiaries}
• متوسط المدة: ${avgDuration} شهر

تفاصيل المشاريع:
=================
${projects.map((p, index) => `${index + 1}. ${p.name}
   • التكلفة: ${new Intl.NumberFormat('ar-SA').format(p.budget)} ريال
   • المستفيدين: ${new Intl.NumberFormat('ar-SA').format(p.beneficiaries || 0)}
   • المدة: ${p.duration} شهر
   • الموقع: ${p.location || 'غير محدد'}
   • الفئة المستهدفة: ${p.targetGroup || 'غير محدد'}
   • الوصف: ${p.description || 'غير متوفر'}`).join('\n\n')}

نتائج التحليل الذكي:
=================
${analysisContent}

توصيات وملاحظات:
=================
• يرجى مراجعة التحليل أعلاه والتأكد من دقة البيانات
• في حال وجود أي استفسارات أو ملاحظات، يرجى التواصل مع فريق الدعم
• يمكن استخدام هذا التقرير لأغراض العرض والتوثيق`;

  const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `تقرير_المشاريع_${new Date().toLocaleDateString('ar-SA').replace(/\//g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// دالة تحليل المشاريع
async function analyzeProjects(data) {
  try {
    const response = await aiService.analyze({
      projectsData: data,
      analysisType: 'comprehensive'
    });
    return response.analysis;
  } catch (error) {
    console.error('Error in AI analysis:', error);
    throw error;
  }
}

function copyAnalysis() {
  const projects = Array.from(window.selectedProjects);
  const totalProjects = projects.length;
  const totalBudget = new Intl.NumberFormat('ar-SA').format(
    projects.reduce((sum, p) => sum + parseInt(p.budget), 0)
  );
  const totalBeneficiaries = new Intl.NumberFormat('ar-SA').format(
    projects.reduce((sum, p) => sum + parseInt(p.beneficiaries || 0), 0)
  );
  const avgDuration = totalProjects > 0
    ? Math.round(projects.reduce((sum, p) => sum + parseInt(p.duration), 0) / totalProjects)
    : 0;

  // الحصول على نص التحليل من textarea
  const analysisTextarea = document.getElementById('analysis-text');
  const analysisContent = analysisTextarea ? analysisTextarea.value : 'لم يتم العثور على نتائج التحليل';

  const analysisText = `تحليل المشاريع المختارة:
• عدد المشاريع: ${totalProjects}
• إجمالي التكلفة: ${totalBudget} ريال
• إجمالي المستفيدين: ${totalBeneficiaries}
• متوسط المدة: ${avgDuration} شهر

تفاصيل المشاريع:
${projects.map(p => `- ${p.name}
  • التكلفة: ${new Intl.NumberFormat('ar-SA').format(p.budget)} ريال
  • المستفيدين: ${new Intl.NumberFormat('ar-SA').format(p.beneficiaries || 0)}
  • المدة: ${p.duration} شهر`).join('\n')}

نتائج التحليل الذكي:
=================
${analysisContent}`;

  navigator.clipboard.writeText(analysisText).then(() => {
    alert('تم نسخ التحليل بنجاح!');
  }).catch(() => {
    alert('حدث خطأ أثناء نسخ التحليل');
  });
}

// إضافة مستمعي الأحداث للأزرار الجديدة
document.getElementById('copyAnalysisBtn').addEventListener('click', copyAnalysis);
document.getElementById('downloadReportBtn').addEventListener('click', downloadReport);

// إضافة مستمعي الأحداث للأزرار
document.getElementById('selectAllBtn').addEventListener('click', toggleSelectAll);
document.getElementById('deselectAllBtn').addEventListener('click', deselectAll);
document.getElementById('deleteSelectedBtn').addEventListener('click', deleteSelectedProjects);
