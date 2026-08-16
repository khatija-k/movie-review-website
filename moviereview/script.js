const movieName = document.title;
const storageKey = "reviews_" + movieName;

const form = document.getElementById("reviewForm");
const submittedReviews = document.getElementById("submittedReviews");

let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

function displayReviews() {
    submittedReviews.innerHTML = "";

    reviews.forEach(function(review, index) {

        const newReview = document.createElement("div");
        newReview.classList.add("submitted-review");

        newReview.innerHTML = `
            <h3>${review.name}</h3>
            <p>${review.rating}</p>
            <p>${review.text}</p>
            <button onclick="deleteReview(${index})">Delete</button>
        `;

        submittedReviews.appendChild(newReview);
    });
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("review").value;

    if (name === "" || reviewText === "") {
        alert("Please enter your name and review.");
        return;
    }

    const newReview = {
        name: name,
        rating: rating,
        text: reviewText
    };

    reviews.push(newReview);

    localStorage.setItem(storageKey, JSON.stringify(reviews));

    displayReviews();

    form.reset();
});

displayReviews();

function deleteReview(index) {

    reviews.splice(index, 1);

    localStorage.setItem(storageKey, JSON.stringify(reviews));

    displayReviews();
}