document.addEventListener("DOMContentLoaded", fireContentLoadedEvent, false);

var chosenTheme = "classic"; // default to classic

function fireContentLoadedEvent() {
	document.body.classList.add("content-loaded");
	document.body.setAttribute("data-type", chosenTheme);

	// Dark theme switch by default
	var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
	if (prefersDarkScheme.matches) {
		chosenTheme = "dark";
		document.body.setAttribute("data-type", chosenTheme);
	}

	//Switch theme CTA
	var colorSwitcherContainer = document.createElement("div");
	colorSwitcherContainer.classList.add("color-switcher-container");
	var CTA = document.createElement("button");
	CTA.setAttribute("aria-label", "Button trigger theme switcher");
	CTA.setAttribute("title", "Button trigger theme switcher");
	CTA.innerHTML = `<svg enable-background='new 0 0 512.012 512.012' width='100%'	height='100%'	viewBox='0 0 512.012 512.012'	width='512'	xmlns='http://www.w3.org/2000/svg'><g><path d='m480.006 73h-49v-58c0-8.284-6.716-15-15-15h-320c-8.284 0-15 6.716-15 15v58h-34v-17c0-8.284-6.716-15-15-15s-15 6.716-15 15v72c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h34v57c0 8.284 6.716 15 15 15h320c8.284 0 15-6.716 15-15v-57h34v93.288l-212.638 53.16c-6.678 1.669-11.362 7.669-11.362 14.552v49h-17c-7.921 0-14.477 6.159-14.971 14.064-8.584 137.35-8.029 128.21-8.029 128.936 0 14.657 5.657 28.582 15.931 39.209 21.651 22.4 56.481 22.407 78.139 0 10.273-10.627 15.931-24.552 15.931-39.209 0-.725.554 8.401-8.029-128.936-.494-7.905-7.05-14.064-14.971-14.064h-17v-37.288l212.638-53.16c6.678-1.669 11.362-7.669 11.362-14.552v-120c-.001-8.284-6.717-15-15.001-15zm-79 72h-290v-115h290zm-120.003 311.415c-.223 13.911-11.579 25.585-24.997 25.585s-24.774-11.674-24.997-25.585l7.089-113.415h35.816z' /></g></svg>`;
	CTA.classList.add("color-switcher");
	colorSwitcherContainer.appendChild(CTA);
	colorSwitcherContainer.addEventListener("click", openCloseSwitcher);
	document.body.insertBefore(colorSwitcherContainer, document.body.firstChild);

	// Theme switcher
	var switcher = document.createElement("div");
	switcher.innerHTML = `<div class='themepicker'><h3 class='themepicker__title'>Select Theme</h3><ul class='themepicker__list' id='theme-menu'><li class='themepicker__item themepicker__item--classic' data-type='classic'><button class='themepicker__btn' data-theme='default' aria-label='select color theme Classic'><span class='themepicker__name'>Classic</span><span class='themepicker__palette'><span class='themepicker__hue themepicker__hue--primary'></span><span class='themepicker__hue themepicker__hue--secondary'></span><span class='themepicker__hue themepicker__hue--tertiary'></span><span class='themepicker__hue themepicker__hue--border'></span><span class='themepicker__hue themepicker__hue--text'></span></span></button></li><li class='themepicker__item themepicker__item--dark' data-type='dark'><button class='themepicker__btn' data-theme='dark' aria-label='select color theme Dark'><span class='themepicker__name'>Dark</span><span class='themepicker__palette'><span class='themepicker__hue themepicker__hue--primary'></span><span class='themepicker__hue themepicker__hue--secondary'></span><span class='themepicker__hue themepicker__hue--tertiary'></span><span class='themepicker__hue themepicker__hue--border'></span><span class='themepicker__hue themepicker__hue--text'></span></span></button></li><li class='themepicker__item themepicker__item--climate' data-type='climate'><button class='themepicker__btn' data-theme='beach' aria-label='select color theme Climate'><span class='themepicker__name'>Climate</span><span class='themepicker__palette'><span class='themepicker__hue themepicker__hue--primary'></span><span class='themepicker__hue themepicker__hue--secondary'></span><span class='themepicker__hue themepicker__hue--tertiary'></span><span class='themepicker__hue themepicker__hue--border'></span><span class='themepicker__hue themepicker__hue--text'></span></span></button></li></ul><button aria-label='exit icon' title='exit icon' class='iconbtn themepicker__close'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'/></svg></button></div>`;
	switcher.classList.add("switcher-pannel");
	document.body.appendChild(switcher);
	switcher
		.querySelector(".themepicker__item--" + chosenTheme)
		.classList.add("themepicker__item--active");

	const pickers = switcher.querySelectorAll(".themepicker__item");
	for (var i = 0; i < pickers.length; i++) {
		pickers[i].addEventListener("click", function() {
			if (!this.classList.contains("themepicker__item--active")) {
				// First, assign the active class to the new selector
				switcher
					.querySelector(".themepicker__item--active")
					.classList.remove("themepicker__item--active");
				this.classList.add("themepicker__item--active");
				// Secondly, change the whole body class to make these changes
				chosenTheme = this.getAttribute("data-type");
				document.body.setAttribute("data-type", chosenTheme);
			}
		});
	}

	// Close CTA
	var closeCTA = document.querySelector(".themepicker__close");
	closeCTA.addEventListener("click", openCloseSwitcher);

	/*
	 * FIXING ONE ACCESSIBILITY ISSUE
	 */

	// Form: missing label associated to inputs + missing aria labels + required field
	// 1. Name field
	var labelName = document.createElement("label");
	var spanName = document.createElement("span");
	var inputName = document.querySelector(
		`#mailchimp-form input[placeholder="Name"]`
	);
	spanName.innerHTML = "Name";
	inputName.setAttribute("aria-label", "Name");
	inputName.setAttribute("aria-required", "false");
	labelName.classList.add("enhanced-field");
	labelName.appendChild(spanName);
	labelName.appendChild(inputName);
	// 2. Email field
	var labelMail = document.createElement("label");
	var spanMail = document.createElement("span");
	var inputMail = document.querySelector(
		`#mailchimp-form input[placeholder="E-mail"]`
	);
	spanMail.innerHTML = "E-mail";
	inputMail.setAttribute("aria-label", "E-mail");
	inputMail.setAttribute("aria-required", "true");
	inputMail.required = true;
	labelMail.classList.add("enhanced-field");
	labelMail.appendChild(spanMail);
	labelMail.appendChild(inputMail);
	// Insert both enhanced fields
	document
		.querySelector("#mailchimp-form")
		.insertBefore(
			labelMail,
			document.querySelector("#mailchimp-form").firstChild
		);
	document
		.querySelector("#mailchimp-form")
		.insertBefore(
			labelName,
			document.querySelector("#mailchimp-form").firstChild
		);
}

function openCloseSwitcher() {
	if (document.body.classList.contains("menu-open")) {
		document.body.classList.remove("menu-open");
	} else {
		document.body.classList.add("menu-open");
	}
}
