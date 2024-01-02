// 初始化所有具有 'turnTips' 类的 Lottie 动画
function initTurnTipsAnimations() {
    const containers = document.querySelectorAll('.turnTips');
    containers.forEach(container => {
      const options = {
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottiefiles/turn-tips.json'
      };
      lottie.loadAnimation(options);
    });
  }
  
  // 初始化另一个Lottie动画
  function initLottieAnimation2() {
    const container = document.getElementById('lottieAnimation2');
    if (container) {
      const options = {
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottiefiles/animation2.json'
      };
      lottie.loadAnimation(options);
    } else {
      console.error('Element #lottieAnimation2 not found');
    }
  }
  
  // 当文档加载完成后调用函数以初始化动画
  document.addEventListener('DOMContentLoaded', () => {
    console.log(typeof initTurnTipsAnimations); // 应输出 'function'，如果未定义则输出 'undefined'
    initTurnTipsAnimations();
  });
  