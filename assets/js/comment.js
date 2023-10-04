

window.onload = function() {
    document.querySelectorAll('.content').forEach(function(content) {
        let publicationDate = content.getAttribute('data-date'); // Get the date from data-date attribute
        let currentDate = moment(); // Get the current date
        let diffDays = currentDate.diff(moment(publicationDate, "YYYY-MM-DD"), 'days'); // Calculate the difference in days
        
        let displayText;
        if(diffDays < 7) {
            displayText = `${diffDays} days ago`;
        } else if(diffDays < 28) {
            displayText = `${Math.floor(diffDays / 7)} weeks ago`;
        } else {
            displayText = moment(publicationDate, "YYYY-MM-DD").fromNow();
        }

        content.querySelector('.publication-date').textContent = displayText; // Update the text content of publication-date
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var comments = document.querySelectorAll('.comments .comment');
    var totalComments = comments.length;

    var heading = document.querySelector('.comments .heading');
    if (heading) {
        heading.textContent += ' (' + totalComments + ')';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let replyLinks = document.querySelectorAll('.reply');

    replyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('leave-comment-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById('smooth-scroll-link');

    if (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const contentPage = document.getElementById('content-page');
            if (contentPage) {
                contentPage.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const commentsContainer = document.querySelector('.comments');
    const comments = commentsContainer.querySelectorAll('.comment');

    if (comments.length > 3) {
        comments.forEach((comment, index) => {
            if (index >= 3) comment.classList.add('hidden-comment');
        });

        const seeMoreButton = document.createElement('div');
        seeMoreButton.innerHTML = '<button class="entry-category underlined-comment">MORE COMMENTS</button>';

        seeMoreButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation
            window.scrollBy(0, 1000); // Change 100 to the amount you want to scroll vertically
            commentsContainer.querySelectorAll('.hidden-comment').forEach(comment => {
                comment.classList.remove('hidden-comment');
            });
            seeMoreButton.remove(); // remove the see more button after expanding comments
        });

        commentsContainer.appendChild(seeMoreButton);
    }
});

