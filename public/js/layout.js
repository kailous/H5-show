function adjustHeight() {
    const viewportHeight = window.innerHeight;
    const element = document.querySelector('.pages'); // 根据需要调整选择器
    if (element) {
      element.style.height = `${viewportHeight}px !important`;
    }
  }
  
  // 当窗口大小改变时调整高度
  window.addEventListener('resize', adjustHeight);
  
  // 页面加载时调整高度
  window.addEventListener('load', adjustHeight);
  