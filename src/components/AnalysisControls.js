export function createAnalysisControls() {
  const container = document.createElement('div');
  container.className = 'analysis-controls';
  
  container.innerHTML = `
    <div class="analysis-options">
      <h3>توجيه الذكاء الاصطناعي</h3>
      <div class="instructions-container">
        <textarea
          id="customInstructions"
          class="custom-textarea"
          placeholder="اكتب تعليماتك للذكاء الاصطناعي هنا... مثال: قم بتحليل المشاريع وفقاً لمعايير مؤسسة عبدالله بن عبدالعزيز الراجحي الخيرية، وقدم توصيات تتماشى مع أهدافنا الخيرية."
          rows="4"
        ></textarea>
      </div>
    </div>
  `;
  
  return container;
}