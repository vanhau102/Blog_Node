//Đối tượng Validator
function Validation(options) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}

	}



	var selectorRules = {};
	//Hàm thực hiện validate
	function validate(inputElement, rule) {
		var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorElement);
		var errorMessage;
		//lấy qua các rules của selector
		var rules = selectorRules[rule.selector];
		//lặp qua từng rule & kiểm tra 
		for (let i = 0; i < rules.length; i++) {
			switch (inputElement.type) {
				case "radio":
				case "checkbox":
					errorMessage = rules[i](
						formElement.querySelector(rule.selector + ":checked")
					);
					break;
				default:
					errorMessage = rules[i](inputElement.value);
					break;
			}
			// Nếu có lỗi dừng kiểm tra
			if (errorMessage) {
				break;
			}
		}
		if (errorMessage) {
			errorElement.innerText = errorMessage;
			getParent(inputElement, options.formGroupSelector).classList.add("invalid");
		} else {
			errorElement.innerText = "";
			getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
		}
		return !errorMessage;
	}
	//Lấy element của form cần validate
	var formElement = document.querySelector(options.form);
	if (formElement) {
		//Khi submit form 
		formElement.onsubmit = function (e) {
			e.preventDefault();

			var isFormValid = true;
			//lặp qua tường rule  và validate
			options.rules.forEach(function (rule) {
				var inputElement = formElement.querySelector(rule.selector);
				var isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});

			if (isFormValid) {
				// Trường hợp submit vs javascript
				if (typeof options.onSubmit === "function") {
					var enableInput = formElement.querySelectorAll("[name]");
					var formValue = Array.from(enableInput).reduce(function (data, input) {
						switch (input.type) {
							case "radio":
								data[input.name] = formElement.querySelector("input[name='" + input.name + "']:checked").value;
								break;
							case "checkbox":
								if (!input.matches(":checked")) {
									data[input.name] = "";
									return data;
								}
								if (!Array.isArray(data[input.name])) {
									data[input.name] = [];
								}
								data[input.name].push(input.value);
								break;
							case "file":
								data[input.name] = input.files;
								break;
							default:
								data[input.name] = input.value;
								break;
						}
						return data;
					}, {})
					options.onSubmit(
						formValue
					);
				}
				// Trường hợp submit với hành vi mặt định
				else {
					formElement.submit();
				}
			}
		}
	}
	// lập qua mõi rule va xử lý (lắng nghe xự kiện blur, input,...)
	options.rules.forEach(function (rule) {
		//Lưu lại các rules cho mỗi input
		if (Array.isArray(selectorRules[rule.selector])) {
			selectorRules[rule.selector].push(rule.test);
		} else {
			selectorRules[rule.selector] = [rule.test];
		}

		var inputElements = formElement.querySelectorAll(rule.selector);
		Array.from(inputElements).forEach(function (inputElement) {
			inputElement.onblur = function () {
				validate(inputElement, rule);
			}
			//Xử lý khi người dùng nhập vào input
			inputElement.oninput = function () {
				var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(".form-message");
				errorElement.innerText = "";
				getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
			}
		})

	});
}
//Định nghĩ các rules
//Nguyên tắc các rules
Validation.isRequired = function (selector, message) {
	return {
		selector: selector,
		test: function (value) {
			return value ? undefined : message || "Vui lòng nhập trường này"
		}
	}
}
Validation.isEmail = function (selector, message) {
	return {
		selector: selector,
		test: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : message || "Trường này nhập Email"
		}
	}

}
Validation.minLength = function (selector, min, message) {
	return {
		selector: selector,
		test: function (value) {
			return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
		}
	}
}
Validation.isConfirmated = function (selector, getConfirmValue, message) {
	return {
		selector: selector,
		test: function (value) {
			return value === getConfirmValue() ? undefined : message || "Giá trị nhập không chính xác ";
		}
	}
}