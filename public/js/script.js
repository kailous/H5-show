// /js/script.js

// 动态加载并初始化组件
async function loadAndInitComponents() {
    try {
        const response = await fetch('/components-list');
        const components = await response.json();

        for (const component of components) {
            const modulePath = `/js/components/${component}`;
            const module = await import(modulePath);
            Object.keys(module).forEach(exportedFunction => {
                if (exportedFunction.startsWith('Plugin_')) {
                    console.log(`执行函数: ${exportedFunction}`);
                    module[exportedFunction]();
                } else {
                    console.error(`在组件 ${component} 中未找到符合 'Plugin_' 命名的函数`);
                }
            });
        }
    } catch (err) {
        console.error('Error loading components:', err);
    }
}

loadAndInitComponents();






function generatePages(pages) {
    console.log('开始生成页面');
    const fullpageContainer = document.getElementById('fullpage');

    // 生成页面内容
    Object.keys(pages).forEach(pageName => {
        console.log(`正在添加页面: ${pageName}`);
        const pageDiv = document.createElement('div');
        pageDiv.id = `page${pageName}Content`;
        pageDiv.className = 'pages section';
        pageDiv.innerHTML = pages[pageName];
        fullpageContainer.appendChild(pageDiv);
    });

    // 处理最后一个元素的类名
    const pageDivs = fullpageContainer.getElementsByClassName('pages section');
    if (pageDivs.length > 0) {
        const lastPageDiv = pageDivs[pageDivs.length - 1];
        lastPageDiv.className = 'pages section lastPage';
    }

    console.log('页面内容添加完毕');
    fetch('/lottiefiles')
        .then(response => response.json())
        .then(files => {
            files.forEach(fileName => {
                // 从文件名获取相应的 class 名称
                const className = fileName.replace('.json', '');
                const containers = document.querySelectorAll(`.lottie.${className}`);

                // 确保至少找到一个匹配的容器
                if (containers.length === 0) {
                    console.error(`没有找到类名为 '${className}' 的 Lottie 容器`);
                    return;
                }

                containers.forEach(container => {
                    lottie.loadAnimation({
                        container: container, // 动画容器
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: `/lottiefiles/${fileName}` // 动画文件路径
                    });
                });
            });
        })
        .catch(err => console.error('无法加载 Lottie 文件:', err));


    // 确保fullpage.js初始化在页面内容加载之后
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: false
    });
}

// 从服务器获取页面内容
fetch('/pages')
    .then(response => response.json())
    .then(pages => {
        // console.log('接收到页面数据', pages);
        generatePages(pages);
    })
    .catch(err => {
        console.error('无法加载页面:', err);
    });