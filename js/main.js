/* ============================================
   GameLearn — JavaScript для интерактива
   ============================================ */

(function () {
  "use strict";

  /* ---------- Бургер-меню ---------- */
  function initBurgerMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("main-nav--open");
      toggle.classList.toggle("nav-toggle--active", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Закрытие меню при клике на ссылку (мобильные)
    var links = nav.querySelectorAll(".main-nav__link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 768) {
          nav.classList.remove("main-nav--open");
          toggle.classList.remove("nav-toggle--active");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---------- FAQ аккордеон ---------- */
  function initFAQ() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-item__question");
      if (!btn) return;

      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("faq-item--open");

        // Закрыть все
        items.forEach(function (other) {
          other.classList.remove("faq-item--open");
        });

        // Открыть текущий, если был закрыт
        if (!isOpen) {
          item.classList.add("faq-item--open");
        }
      });
    });
  }

  /* ---------- Форма обратной связи ---------- */
  function initContactForm() {
    var form = document.querySelector(".form--contact");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var status = form.querySelector(".form__status");

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        if (status) {
          status.textContent = "Пожалуйста, заполните все обязательные поля.";
          status.style.color = "#e54b4b";
        }
        return;
      }

      // Простейшая валидация email
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        if (status) {
          status.textContent = "Введите корректный email.";
          status.style.color = "#e54b4b";
        }
        return;
      }

      if (status) {
        status.textContent = "Спасибо! Ваше сообщение отправлено.";
        status.style.color = "#2e7d32";
      }

      form.reset();
    });
  }

  /* ---------- Форма подписки (sidebar) ---------- */
  function initSubscribeForm() {
    var form = document.querySelector(".sidebar__subscribe");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type='email']");
      var msg = form.querySelector(".sidebar__subscribe-msg");

      if (input && input.value.trim()) {
        if (msg) {
          msg.textContent = "Вы подписались!";
          msg.style.color = "#2e7d32";
        }
        input.value = "";
      }
    });
  }

  /* ---------- Фильтрация сервисов ---------- */
  function initServiceFilter() {
    var filterForm = document.querySelector(".sidebar__filter-form");
    if (!filterForm) return;

    var cards = document.querySelectorAll(".card--service");

    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilter();
    });

    var selects = filterForm.querySelectorAll("select");
    selects.forEach(function (sel) {
      sel.addEventListener("change", applyFilter);
    });

    function applyFilter() {
      var categoryVal = filterForm.querySelector("#filterCategory");
      var priceVal = filterForm.querySelector("#filterPrice");
      var searchVal = filterForm.querySelector("#filterSearch");

      var cat = categoryVal ? categoryVal.value : "all";
      var price = priceVal ? priceVal.value : "all";
      var search = searchVal ? searchVal.value.toLowerCase().trim() : "";

      cards.forEach(function (card) {
        var cardCat = card.getAttribute("data-category") || "";
        var cardPrice = card.getAttribute("data-price") || "";
        var cardTitle = card.querySelector(".card__title");
        cardTitle = cardTitle ? cardTitle.textContent.toLowerCase() : "";

        var catMatch = cat === "all" || cardCat.indexOf(cat) !== -1;
        var priceMatch = price === "all" || cardPrice === price;
        var searchMatch = !search || cardTitle.indexOf(search) !== -1;

        if (catMatch && priceMatch && searchMatch) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    }
  }

  /* ---------- Плавная прокрутка к якорям ---------- */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollInto({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ---------- Инициализация ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initBurgerMenu();
    initFAQ();
    initContactForm();
    initSubscribeForm();
    initServiceFilter();
    initSmoothScroll();
  });
})();
