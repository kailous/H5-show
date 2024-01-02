// 定义初始化 Lottie 动画的函数
function initLottieAnimation(fileName) {
  const className = fileName.replace('.json', '');
  const containers = document.querySelectorAll(`.${className}`);
  containers.forEach(container => {
    const options = {
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `/lottiefiles/${fileName}`
    };
    lottie.loadAnimation(options);
  });
}

// 定义一个函数来获取并初始化所有 Lottie 动画
function loadAndInitAnimations() {
  fetch('/lottiefiles')
    .then(response => response.json())
    .then(files => {
      files.forEach(file => {
        initLottieAnimation(file);
      });
    })
    .catch(err => console.error('无法加载动画文件:', err));
}

// 导出这个函数以在其他地方使用
export { loadAndInitAnimations };