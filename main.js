document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle code
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const icon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    });
  });

  // Contact form submission handler
  const contactForm = document.getElementById("contact-form");
  const loadingMessage = document.getElementById("loading-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      loadingMessage.style.display = "block";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        loadingMessage.style.display = "none";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        loadingMessage.style.display = "none";
        return;
      }

      const data = { name, email, message };

      try {
        const response = await fetch("/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message || "Message sent successfully!");
          contactForm.reset();
        } else {
          alert(result.message || "Something went wrong. Please try again later.");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
      } finally {
        loadingMessage.style.display = "none";
      }
    });
  }
});
