///////////// Product page//////////////

document.addEventListener("DOMContentLoaded", function () {

    const productPage = document.querySelector(".products-page");
    const modal = document.getElementById("productModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDescription = document.getElementById("modalDescription");
    const closeButton = modal.querySelector(".modal-close");

    /* LOAD ONE MORE PRODUCT IN THE SELECTED CATEGORY */
   productPage.querySelectorAll(".product-section").forEach(function (section) {
    const loadMoreButton = section.querySelector(".load-more");

    if (!loadMoreButton) return;

    loadMoreButton.addEventListener("click", function () {
        const nextProduct = section.querySelector(
            ".extra-product:not(.show-product)"
        );

        if (nextProduct) {
            nextProduct.classList.add("show-product");
        }

        // Hide the button when all extra products are displayed
        if (!section.querySelector(".extra-product:not(.show-product)")) {
            loadMoreButton.style.display = "none";
        }
    });
});

    /* OPEN PRODUCT DETAILS */
    productPage.addEventListener("click", function (event) {
        const card = event.target.closest(".product-card");

        if (!card) return;

        const image = card.querySelector("img");
        const title = card.querySelector("h3");
        const price = card.querySelector("p");

        if (!image || !title || !price) return;

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = title.textContent;
        modalPrice.textContent = price.textContent;
        modalDescription.textContent =
            card.dataset.description || "Contact BookNest for more information about this product.";

        modal.classList.add("modal-open");
        modal.setAttribute("aria-hidden", "false");
        closeButton.focus();
    });

    /* CLOSE POPUP */
    function closeModal() {
        modal.classList.remove("modal-open");
        modal.setAttribute("aria-hidden", "true");
    }

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("modal-open")) {
            closeModal();
        }
    });

});

///////////END OF PRODUCT PAGE/////////

/////////CONTACT PAGE//////////////

/////////END OF CONTACT PAGE//////



//****** SEARCH BAR FUNCTIONALITY*******/

// BookNest search functionality
document.addEventListener("DOMContentLoaded", function () {

    // Handle search forms on every page
    const searchForms = document.querySelectorAll(".search-bar");

    searchForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const input = form.querySelector('input[name="search"]');
            const searchTerm = input.value.trim();

            if (searchTerm === "") {
                return;
            }

            // Go to the Products page with the search term
            window.location.href =
                "products.html?search=" + encodeURIComponent(searchTerm);
        });
    });

    // Only run the filtering code on the Products page
    const productPage = document.querySelector(".products-page");

    if (!productPage) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const searchTerm = (params.get("search") || "").toLowerCase().trim();

    // Do nothing if the customer did not search
    if (!searchTerm) {
        return;
    }

    const sections = productPage.querySelectorAll(".product-section");
    let totalMatches = 0;

    // Create a message for the search results
    const resultsMessage = document.createElement("p");
    resultsMessage.className = "search-results-message";
    resultsMessage.setAttribute("role", "status");
    productPage.prepend(resultsMessage);

    sections.forEach(function (section) {
        const products = section.querySelectorAll(".product-card");
        let sectionMatches = 0;

        products.forEach(function (product) {
            const productText = product.textContent.toLowerCase();
            const description =
                (product.dataset.description || "").toLowerCase();

            const matches =
                productText.includes(searchTerm) ||
                description.includes(searchTerm);

            if (matches) {
                product.style.display = "";
                product.classList.add("show-product");
                sectionMatches++;
                totalMatches++;
            } else {
                product.style.display = "none";
            }
        });

        // Hide categories that have no matching products
        section.style.display = sectionMatches > 0 ? "" : "none";

        // Hide Load More buttons while showing search results
        const loadMoreButton = section.querySelector(".load-more");

        if (loadMoreButton) {
            loadMoreButton.style.display = "none";
        }
    });

    if (totalMatches > 0) {
        resultsMessage.textContent =
            totalMatches + " product(s) found for \"" + searchTerm + "\".";
    } else {
        resultsMessage.textContent =
            "No products found for \"" + searchTerm +
            "\". Please try another search.";
    }
});


// BookNest contact form validation
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    // Only run on the page containing the contact form
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name.length < 2) {
            event.preventDefault();
            alert("Please enter a name containing at least 2 characters.");
            document.getElementById("name").focus();
            return;
        }

        if (message.length < 10) {
            event.preventDefault();
            alert("Please enter a message containing at least 10 characters.");
            document.getElementById("message").focus();
        }
    });
});

// BookNest enquiry form validation
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) {
        return;
    }

    enquiryForm.addEventListener("submit", function (event) {
        const name = document.getElementById("name");
        const message = document.getElementById("enquiry");

        name.value = name.value.trim();
        message.value = message.value.trim();

        if (name.value.length < 2) {
            event.preventDefault();
            alert("Please enter your full name.");
            name.focus();
            return;
        }

        if (message.value.length < 10) {
            event.preventDefault();
            alert("Please enter a message of at least 10 characters.");
            message.focus();
        }
    });
});

// BookNest enquiry form submission
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) {
        return;
    }

    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("enquiry");
        const enquiryType = document.getElementById("enquiryType");
        const status = document.getElementById("enquiryStatus");
        const submitButton = enquiryForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        name.value = name.value.trim();
        message.value = message.value.trim();

        if (name.value.length < 2) {
            alert("Please enter your name.");
            name.focus();
            return;
        }

        if (message.value.length < 10) {
            alert("Please enter a message of at least 10 characters.");
            message.focus();
            return;
        }

        if (!enquiryForm.reportValidity()) {
            return;
        }

        status.textContent = "Sending your enquiry...";
        submitButton.disabled = true;

        try {
            const formData = new FormData(enquiryForm);
            formData.append("_subject", "New BookNest Enquiry");

            const response = await fetch(
                "https://formsubmit.co/ajax/booknest.library.01@gmail.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("The enquiry could not be sent.");
            }

            const result = await response.json();

            if (result.success === true || result.success === "true") {
                status.textContent =
                    "Thank you! Your enquiry has been sent successfully. BookNest will respond to your email.";
                enquiryForm.reset();
            } else {
                throw new Error("The email service did not confirm receipt.");
            }
        } catch (error) {
            status.textContent =
                "Sorry, your enquiry could not be sent. Please try again later.";
        } finally {
            submitButton.disabled = false;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const message = document.getElementById("message");
        const status = document.getElementById("contactStatus");
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        name.value = name.value.trim();
        message.value = message.value.trim();

        if (!contactForm.reportValidity()) {
            return;
        }

        if (name.value.length < 2) {
            alert("Please enter a name with at least 2 characters.");
            name.focus();
            return;
        }

        if (message.value.length < 10) {
            alert("Please enter a message with at least 10 characters.");
            message.focus();
            return;
        }

        status.textContent = "Sending your message...";
        submitButton.disabled = true;

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/booknest.library.01@gmail.com",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Message submission failed.");
            }

            const result = await response.json();

            if (result.success === true ||
                result.success === "true") {

                status.textContent =
                    "Thank you for contacting BookNest! " +
                    "Your message has been submitted. " +
                    "We will respond to your email.";

                contactForm.reset();

            } else {
                throw new Error("Submission was not confirmed.");
            }

        } catch (error) {
            status.textContent =
                "Sorry, your message could not be sent. " +
                "Please try again later.";
        } finally {
            submitButton.disabled = false;
        }
    });
});
