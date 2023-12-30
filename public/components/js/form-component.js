document.addEventListener('DOMContentLoaded', function () {
    const contactForms = document.querySelectorAll('.contactForm');
  
    contactForms.forEach(function (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm(contactForm);
      });
    });
  
    function validateForm(form) {
      const name = form.querySelector('.name');
      const phone = form.querySelector('.phone');
      const company = form.querySelector('.company');
      const number = form.querySelector('.number');
  
      const nameError = form.querySelector('.name-error');
      const phoneError = form.querySelector('.phone-error');
      const companyError = form.querySelector('.company-error');
      const numberError = form.querySelector('.number-error');

        // 清除旧的错误消息
        clearErrors(nameError, phoneError, companyError, numberError);

        if (!name.value) {
            displayError(nameError, '忘记输入姓名啦～');
        }

        if (!phone.value) {
            displayError(phoneError, '忘记输入手机号码啦～');
        } else if (!/^[1][3-9][0-9]{9}$/.test(phone.value)) {
            displayError(phoneError, '这不是手机号码哦～');
        }

        if (!company.value) {
            displayError(companyError, '企业名称还没填呢');
        } else if (company.value.length < 2) {
            displayError(companyError, '要输入完整的企业名称哦～');
        }

        if (number.value && number.value > 100) {
            displayError(numberError, '不要逗我啦～ 这怎么可能～');
        }
    }

    function clearErrors(...elements) {
        elements.forEach(element => element.innerHTML = '');
    }

    function displayError(element, message) {
        const errorSpan = document.createElement('span'); // 创建span元素
        const errorPara = document.createElement('p');    // 创建p元素
        errorPara.textContent = message;                  // 设置错误信息文本
        errorSpan.appendChild(errorPara);                 // 将p元素添加到span中
        element.appendChild(errorSpan);                   // 将span元素添加到指定的元素中
    }    
});
