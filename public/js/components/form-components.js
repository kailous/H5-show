// /js/components/form-components.js

// 添加表单验证事件监听器
export function Plugin_initFormValidation() {
    console.log('表单验证插件已加载');
    const contactForms = document.querySelectorAll('[id^="contactForm"]');
    
    contactForms.forEach(function (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            validateForm(contactForm);
        });
    });

    function displayError(element, message) {
        element.innerHTML = ''; // 清空现有的错误信息
        const errorSpan = document.createElement('span'); // 创建span元素
        const errorP = document.createElement('p');    // 创建p元素
        errorP.textContent = message;                  // 设置错误信息文本
        errorSpan.appendChild(errorP);                 // 将p元素添加到span中
        element.appendChild(errorSpan);                // 将span元素添加到指定的元素中
    }

    function validateForm(form) {
        const name = form.querySelector('[id^="name"]');
        const phone = form.querySelector('[id^="phone"]');
        const company = form.querySelector('[id^="company"]');
        const number = form.querySelector('[id^="number"]');

        const nameError = form.querySelector('[id^="name-error"]');
        const phoneError = form.querySelector('[id^="phone-error"]');
        const companyError = form.querySelector('[id^="company-error"]');
        const numberError = form.querySelector('[id^="number-error"]');

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
};
Plugin_initFormValidation();
// export { Plugin_initFormValidation };