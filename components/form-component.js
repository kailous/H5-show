// form-component.js

// 生成唯一后缀的函数
function generateUniqueSuffix() {
    return Math.floor(Math.random() * 1000); // 使用随机数作为后缀
  }
  
  const formComponentHTML = `
  <!-- 表单组件 -->
  <form id="contactForm-${generateUniqueSuffix()}" action="#" method="post" novalidate>
    <div class="form-group">
        <label for="name-${generateUniqueSuffix()}">姓名：</label>
        <input type="text" id="name-${generateUniqueSuffix()}" name="name" required placeholder="请输入您的姓名" />
        <div class="error-message" id="name-error-${generateUniqueSuffix()}"></div>
    </div>
  
    <div class="form-group">
        <label for="phone-${generateUniqueSuffix()}">手机号码：</label>
        <input type="tel" id="phone-${generateUniqueSuffix()}" name="phone" required pattern="^[1][3-9][0-9]{9}$" placeholder="请输入您的手机号码" />
        <div class="error-message" id="phone-error-${generateUniqueSuffix()}"></div>
    </div>
  
    <div class="form-group">
        <label for="company-${generateUniqueSuffix()}">企业名称：</label>
        <input type="text" id="company-${generateUniqueSuffix()}" name="company" required minlength="2" placeholder="请输入您的企业名称" />
        <div class="error-message" id="company-error-${generateUniqueSuffix()}"></div>
    </div>
  
    <div class="form-group">
        <label for="number-${generateUniqueSuffix()}">随行人数：</label>
        <input type="number" id="number-${generateUniqueSuffix()}" name="number" placeholder="请输入随行人数" max="100" />
        <div class="error-message" id="number-error-${generateUniqueSuffix()}"></div>
    </div>
  
    <div class="form-group">
        <button type="submit">提交</button>
    </div>
  </form>
  `;
  
  module.exports = formComponentHTML;
  