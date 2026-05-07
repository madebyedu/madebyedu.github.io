// Portfolio Website JavaScript
// Handles mobile menu toggle and smooth interactions

class PortfolioApp {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.body = document.body;
    this.mobileMenuLinks = document.querySelectorAll(".mobile-menu__list a");

    if (this.mobileMenu) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.handleKeyboardNavigation();
  }

  bindEvents() {
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    this.mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", (e) => {
        if (e.target === this.mobileMenu) {
          this.closeMobileMenu();
        }
      });
    }

    window.addEventListener("resize", () => {
      this.handleResize();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenu.classList.contains("active")) {
        this.closeMobileMenu();
      }
    });

    // No IMG Right Click
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  toggleMobileMenu() {
    const isActive = this.mobileMenu.classList.contains("active");
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const scrollY = window.scrollY;
    this.hamburger.classList.add("active");
    this.hamburger.setAttribute("aria-expanded", "true");
    this.mobileMenu.classList.add("active");
    this.body.classList.add("menu-open");
    this.body.style.top = `-${scrollY}px`;

    setTimeout(() => {
      const firstMenuItem = this.mobileMenu.querySelector(
        ".mobile-menu__list a",
      );
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }, 100);
  }

  closeMobileMenu() {
    const scrollY = this.body.style.top;
    this.hamburger.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    this.mobileMenu.classList.remove("active");
    this.body.classList.remove("menu-open");
    this.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    setTimeout(() => {
      this.hamburger.focus();
    }, 100);
  }

  handleResize() {
    if (
      window.innerWidth >= 768 &&
      this.mobileMenu.classList.contains("active")
    ) {
      this.closeMobileMenu();
    }
  }

  handleKeyboardNavigation() {
    this.mobileMenu.addEventListener("keydown", (e) => {
      if (!this.mobileMenu.classList.contains("active")) return;

      const focusableElements = this.mobileMenu.querySelectorAll(
        ".mobile-menu__list a",
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
  }
}

// Smooth scroll functionality for anchor links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href === "#" || href === "#about" || href === "#contact") {
          e.preventDefault();
          console.log(
            `Navigation to ${href} - This would navigate to the ${href.slice(1)} page in a full implementation`,
          );
          return;
        }
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }
}

// Performance monitoring (optional)
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      if ("performance" in window) {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        if (loadTime > 3000) {
          console.warn("Page load time exceeds 3 seconds");
        }
      }
    });
  }
}

// Scroll to Top Button functionality
class ScrollToTopButton {
  constructor() {
    this.button = document.getElementById("page-return");
    this.scrollThreshold = 300;
    this.init();
  }

  init() {
    if (!this.button) return;

    window.addEventListener("scroll", () => {
      this.toggleButtonVisibility();
    });

    this.button.addEventListener("click", () => {
      this.scrollToTop();
    });
  }

  toggleButtonVisibility() {
    const scrollPosition =
      window.scrollY ??
      window.pageYOffset ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      0;

    if (scrollPosition > this.scrollThreshold) {
      this.button.classList.add("visible");
    } else {
      this.button.classList.remove("visible");
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Scroll Animation functionality
class ScrollAnimator {
  constructor() {
    this.init();
  }

  init() {
    const options = {
      rootMargin: "0px 0px -50px 0px",
    };

    // We create a counter and a timer to group elements that appear together
    let delayCounter = 0;
    let delayTimer = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 1. Assign the current delay to this specific element
          const delay = delayCounter * 0.15; // 0.15s gap between items
          entry.target.style.transitionDelay = `${delay}s`;

          // 2. Trigger the animation
          entry.target.classList.add("show");
          observer.unobserve(entry.target);

          // 3. Increase the counter for the next item in this batch
          delayCounter++;

          // 4. Reset the counter after 100 milliseconds.
          // If you scroll further down later, the next item starts instantly at 0s delay.
          clearTimeout(delayTimer);
          delayTimer = setTimeout(() => {
            delayCounter = 0;
          }, 100);
        }
      });
    }, options);

    const hiddenElements = document.querySelectorAll(".animate-on-scroll");
    hiddenElements.forEach((el) => observer.observe(el));
  }
}

// Form Submission Logic
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", async function (event) {
    // 1. Prevent default submission to handle it via JS
    event.preventDefault();

    // 2. Check native HTML5 validity (this triggers your CSS :user-invalid states!)
    if (!form.checkValidity()) {
      return; // Stop the script if there are errors
    }

    // 3. If valid, send the data in the background
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        formMessage.textContent = "Message sent! I'll get back to you soon.";
        formMessage.style.color = "var(--text)";
        form.reset();
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000);
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.style.color = "oklch(65% 0.18 25)";
      }
    } catch (error) {
      formMessage.textContent = "Network error. Please check your connection.";
      formMessage.style.color = "oklch(65% 0.18 25)";
    }
  });
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
  new SmoothScroll();
  new ScrollToTopButton();
  new ScrollAnimator();

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    new PerformanceMonitor();
  }

  document.body.classList.add("loaded");
  console.log("Portfolio website initialized successfully!");
});

// Export for potential testing or module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PortfolioApp,
    SmoothScroll,
    PerformanceMonitor,
    ScrollToTopButton,
  };
}
