// 添加表单验证事件监听器
document.addEventListener('DOMContentLoaded', function () {
    const contactForms = document.querySelectorAll('[id^="contactForm"]');
  
    contactForms.forEach(function (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm(contactForm);
      });
    });
  
    function validateForm(form) {
      const name = form.querySelector('[id^="name"]');
      const phone = form.querySelector('[id^="phone"]');
      const company = form.querySelector('[id^="company"]');
      const number = form.querySelector('[id^="number"]');
  
      const nameError = form.querySelector('[id^="name-error"]');
      const phoneError = form.querySelector('[id^="phone-error"]');
      const companyError = form.querySelector('[id^="company-error"]');
      const numberError = form.querySelector('[id^="number-error"]');
  
      nameError.textContent = '';
      phoneError.textContent = '';
      companyError.textContent = '';
      numberError.textContent = '';
  
      if (!name.value) {
        nameError.textContent = '忘记输入姓名啦～';
      }
  
      if (!phone.value) {
        phoneError.textContent = '忘记输入手机号码啦～';
      } else if (!/^[1][3-9][0-9]{9}$/.test(phone.value)) {
        phoneError.textContent = '这不是手机号码哦～';
      }
  
      if (!company.value) {
        companyError.textContent = '企业名称还没填呢';
      } else if (company.value.length < 2) {
        companyError.textContent = '要输入完整的企业名称哦～';
      }
  
      if (number.value && number.value > 100) {
        numberError.textContent = '不要逗我啦～ 这怎么可能～';
      }
    }
  });
  