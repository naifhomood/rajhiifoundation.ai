import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB0oQfOX_wFJOQIXev6BNWZAE9P8CyZPqA');

function cleanText(text) {
  return text
    .replace(/[*#_]/g, '')
    .replace(/---/g, '')
    .replace(/\s+:/g, ':')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function cleanProjectReferences(text, projectNames) {
  if (!text || !projectNames || projectNames.length === 0) return text;
  
  let cleanedText = text;
  
  // استبدال "كلا المشروعين"
  cleanedText = cleanedText.replace(/كلا المشروعين/g, `مشروعي "${projectNames.join('" و"')}"`);
  
  // معالجة المقارنات والإشارات للمشاريع
  projectNames.forEach((name, index) => {
    const projectNum = index + 1;
    
    // استبدال الإشارات المباشرة للمشروع
    const projectPattern = new RegExp(`المشروع ${projectNum}\\b(?!\\s*مستفيد|\\s*[٠-٩])`, 'g');
    cleanedText = cleanedText.replace(projectPattern, `مشروع "${name}"`);
    
    // استبدال الإشارات في بداية الجمل
    const startPattern = new RegExp(`^المشروع ${projectNum}\\b`, 'gm');
    cleanedText = cleanedText.replace(startPattern, `مشروع "${name}"`);
    
    // استبدال الإشارات في المقارنات
    const comparisonPattern = new RegExp(`\\bالمشروع ${projectNum}\\b(?=.*?المشروع\\s*\\d)`, 'g');
    cleanedText = cleanedText.replace(comparisonPattern, `مشروع "${name}"`);
    
    // استبدال الأرقام المنفردة (مع تجنب الأرقام الإحصائية)
    const standaloneNumber = new RegExp(`\\b${projectNum}\\b(?!\\s*[:.]|\\s*مستفيد|\\s*[٠-٩])`, 'g');
    cleanedText = cleanedText.replace(standaloneNumber, `مشروع "${name}"`);
  });
  
  return cleanedText;
}

export async function processItemsWithAI(projects, customInstructions) {
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    throw new Error('لم يتم اختيار أي مشاريع للتحليل');
  }

  const validProjects = projects.filter(project => 
    project && 
    typeof project === 'object' && 
    project.name && 
    project.organization
  );

  if (validProjects.length === 0) {
    throw new Error('المشاريع المحددة غير صالحة للتحليل');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // تجميع معلومات المشاريع
    const projectsInfo = validProjects.map((project, index) => `
المشروع: ${project.name}
المنظمة: ${project.organization}
الوصف: ${project.description || 'غير متوفر'}
الفئة المستهدفة: ${project.targetGroup || 'غير محدد'}
الميزانية: ${project.budget?.toLocaleString() || 0} ريال
عدد المستفيدين: ${project.beneficiaries?.toLocaleString() || 0}
المدة: ${project.duration || 0} يوم
الموقع: ${project.location || 'غير محدد'}
التعليمات: ${project.dataset.instructions || 'لا توجد تعليمات مخفية'}
`).join('\n-------------------\n');

    // إنشاء التعليمات
    const prompt = `معلومات المشاريع:\n${projectsInfo}\n\nالتوجيهات:\n${customInstructions || 'قم بتحليل المشاريع المذكورة'}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    let analysisText = response.text();
    
    // استبدال أرقام المشاريع بأسمائها
    const projectNames = validProjects.map(p => p.name);
    analysisText = cleanProjectReferences(analysisText, projectNames);
    
    return `
    <div class="analysis-report" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl;">
      <div class="analysis-container" style="background: linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%); border: 1px solid #dee2e6; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div class="analysis-header" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: #2c3e50; font-size: 1.5em;">
            <i class="fas fa-chart-line" style="margin-left: 10px; color: #3498db;"></i>
            نتائج التحليل
          </h3>
          <div class="analysis-actions">
            <button onclick="copyAnalysis()" style="background-color: #3498db; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-copy"></i>
              نسخ التحليل
            </button>
          </div>
        </div>
        
        <div class="analysis-content" style="background-color: white; border-radius: 8px; padding: 20px; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);">
          <textarea 
            id="analysis-text" 
            style="width: 100%; 
                   min-height: 400px; 
                   padding: 20px; 
                   border: 1px solid #e1e8ed; 
                   border-radius: 8px; 
                   font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                   font-size: 16px; 
                   line-height: 1.8; 
                   resize: vertical; 
                   direction: rtl;
                   color: #2c3e50;
                   background-color: #f8f9fa;
                   transition: all 0.3s ease;" 
            readonly
            onmouseover="this.style.borderColor='#3498db'"
            onmouseout="this.style.borderColor='#e1e8ed'"
          >${analysisText}</textarea>
        </div>
        
        <div class="analysis-footer" style="margin-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
          <button onclick="downloadAnalysis()" style="background-color: #2ecc71; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-download"></i>
            تحميل التقرير
          </button>
        </div>
      </div>
    </div>
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap" rel="stylesheet">
    
    <script>
      function copyAnalysis() {
        const textarea = document.getElementById('analysis-text');
        textarea.select();
        document.execCommand('copy');
        
        // إظهار رسالة نجاح النسخ
        const notification = document.createElement('div');
        notification.style.cssText = \`
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: 'Cairo', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        \`;
        notification.innerHTML = '<i class="fas fa-check-circle"></i> تم نسخ التحليل بنجاح';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }, 2000);
      }

      function downloadAnalysis() {
        const text = document.getElementById('analysis-text').value;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'تحليل_المشاريع.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // إظهار رسالة نجاح التحميل
        const notification = document.createElement('div');
        notification.style.cssText = \`
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2ecc71;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-family: 'Cairo', sans-serif;
          font-size: 14px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        \`;
        notification.innerHTML = '<i class="fas fa-check-circle"></i> تم تحميل التقرير بنجاح';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s ease';
          setTimeout(() => notification.remove(), 500);
        }, 2000);
      }
    </script>`;
  } catch (error) {
    console.error('Error in AI analysis:', error);
    
    let errorMessage = 'عذراً، حدث خطأ أثناء تحليل المشاريع.';
    
    if (error.message.includes('rate limit exceeded')) {
      errorMessage = 'عذراً، تم تجاوز الحد الأقصى لعدد الطلبات. يرجى المحاولة بعد ساعة من الآن.';
    } else if (error.message.includes('API key')) {
      errorMessage = 'خطأ في مفتاح API - يرجى التواصل مع مسؤول النظام';
    } else if (error.message.includes('network')) {
      errorMessage = 'خطأ في الاتصال - يرجى التحقق من اتصال الإنترنت';
    }
    
    return `
    <div class="error-message" style="color: #721c24; background-color: #f8d7da; padding: 20px; border: 1px solid #f5c6cb; border-radius: 5px; margin: 10px; text-align: right;">
      <h3 style="margin: 0 0 10px 0; color: #721c24;">⚠️ تنبيه</h3>
      <p style="margin: 0;">${errorMessage}</p>
      ${error.message.includes('rate limit exceeded') ? 
        '<p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">سيتم إعادة تعيين حد الاستخدام تلقائياً بعد ساعة.</p>' : 
        ''}
    </div>`;
  }
}

export const aiService = {
  processItemsWithAI,
  cleanText,
  cleanProjectReferences
};
