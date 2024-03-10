"use strict";

//====== ALL NEW POST ARE HERE ====\\
var POSTS_PATHS = [
    '/blog/post/my-hobby-making-music-with-money-and-code.html',
    '/blog/post/unveiling-promise-by-swendl-a-journey-through-love-and-patience.html',
    '/blog/post/swendl-journey-2024-music-studies-ai-miami.html',
    '/blog/post/dj-swendl-stuck-in-your-space-skyrockets-to-30k-spotify-streams.html',
    '/blog/post/drive-with-me-a-symphony-of-change.html',

    // ...add paths as needed...
];

var videoIds = [
    'zPd9fbrejCs',
    '-gztZDLzsyY',
    'lMljXEU9isE',
    '-XCO0Hngqh8',
    '5D1hn4ATrYE',
    'FLYPTKaWY0c',
    'nXgDdkigU60',
    'GTONgADLiCs',
    
    // ... other video IDs ...
];


//====== Open & Close Aside Navigation ====\\

const openNav = document.querySelector(".open-nav");
const closeNav = document.querySelector(".close-nav");
const asideOverlay = document.querySelector(".aside-navigation-overlay");
const asideNav = document.querySelector(".aside-navigation");
const body = document.body; // Reference to the body element

const html = document.documentElement;

function preventScroll(event) {
    event.preventDefault();
}


openNav.addEventListener("click", function (event) {
    event.preventDefault();
    asideOverlay.classList.add("active");
    asideNav.classList.add("active");
    body.classList.add("no-scroll");
    html.classList.add("no-scroll-html");
    $('.sticky-section').css('top', '-50px'); // Hide the sticky bar
    
    document.addEventListener('touchmove', preventScroll, { passive: false });
});

closeNav.addEventListener("click", function (event) {
    event.preventDefault();
    asideOverlay.classList.remove("active");
    asideNav.classList.remove("active");
    body.classList.remove("no-scroll");
    html.classList.remove("no-scroll-html");
    
    document.removeEventListener('touchmove', preventScroll);

    document.querySelector('.sticky-section').style.top = '0'; // Show the sticky bar when navbar is closed.
});


document.addEventListener('click', function(event) {
    if (!asideNav.contains(event.target) && !openNav.contains(event.target)) {
        asideOverlay.classList.remove('active');
        asideNav.classList.remove('active');
        body.classList.remove("no-scroll");
        html.classList.remove("no-scroll-html"); //Ensure the no-scroll-html class is removed properly
        
        if($(window).scrollTop() === 0) {
            document.querySelector('.sticky-section').style.top = '0';
        }
    }
});

window.addEventListener('resize', function() {
    document.querySelector('.aside-navigation').style.height = window.innerHeight + 'px';
});
window.dispatchEvent(new Event('resize'));



// SWENDL OFICLAL WEBSITE BAR
$(document).ready(function () {
    var lastScrollTop = 0;
    $(window).scroll(function () {
        var currentScrollTop = $(this).scrollTop();
        
        // Check if the navbar is open
        if ($('.navbar').hasClass('open')) {
            $('.sticky-section').css('top', '-50px'); // hide the bar
        } else {
            if (currentScrollTop > lastScrollTop || currentScrollTop === 0) {
                // If scrolling down or at the top of the page, show the bar.
                document.querySelector('.sticky-section').style.top = '0';
            } else {
                // If scrolling up and not at the top of the page, hide the bar.
                $('.sticky-section').css('top', '-50px'); // Assuming the height of your bar is 50px
            }
        }
        
        lastScrollTop = currentScrollTop;
    });
});






// COOL ANIMATION

// Select all elements with class 'animated'
const animatedElements = document.querySelectorAll('.animated');
let animationId;

animatedElements.forEach(animatedElement => {
    animatedElement.addEventListener('mouseenter', function() {
        const targetValue = this.getAttribute('data-value');
        let index = 0;
        
        animationId = setInterval(() => {
            let randomString = '';
            for (let i = 0; i < targetValue.length; i++) {
                if (i < index) {
                    randomString += targetValue[i];
                } else {
                    randomString += String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
            
            this.textContent = randomString;
            
            if (index < targetValue.length) {
                index++;
            } else {
                clearInterval(animationId);
            }
        }, 50);
    });

    // If you want to reset the text on 'mouseleave', add a 'mouseleave' event listener
    animatedElement.addEventListener('mouseleave', function() {
        clearInterval(animationId);
        this.textContent = this.getAttribute('data-value');
    });
});















// Call the function to load content when the page loads
  document.addEventListener('DOMContentLoaded', (event) => {
    loadBlogPostContent();
});

function loadBlogPostContent() {

  
    const container = document.getElementById('blog-container');

    if (!container) {
        console.error('Element with id "blog-container" not found');
        return; // Exit the function if container is null
    }

    // Loop through each post URL
    POSTS_PATHS.forEach((POSTS_PATHS) => {
      fetch(POSTS_PATHS)
        .then((response) => response.text())
        .then((html) => {
          // Create a temporary div to hold the parsed HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = html;
  
          // Extract the relevant content from the template
          const category = tempDiv.querySelector('.entry-category').textContent;
          const title = tempDiv.querySelector('.entry-title').textContent;
          const date = tempDiv.querySelector('.entry-date').textContent;
          const imageSrc = tempDiv.querySelector('.entry-thumbnail img').getAttribute('src');
  
          // Create a new blog item element and insert the content
          const blogItem = document.createElement('div');
          blogItem.classList.add('blog-item');
          blogItem.innerHTML = `
            <figure class="entry-thumbnail">
              <img src="${imageSrc}" alt="" class="img-cover">
            </figure>
            <a href="${POSTS_PATHS}" class="entry-category">${category}</a>
            <h2 class="entry-title"><a href="${POSTS_PATHS}">${title}</a></h2>
            <p class="entry-date">${date}</p>
          `;
  
          // Append the blog item to the container
          container.appendChild(blogItem);
        })
        .catch((error) => {
          console.error('Error fetching blog post content:', error);
        });
    });
  }
  

  
  $(document).ready(function () {
    var currentIndex = 0;

    var loadPost = function () {
        if (currentIndex >= POSTS_PATHS.length) currentIndex = 0; // Reset index if it reaches the end
        var path = POSTS_PATHS[currentIndex];

        $.ajax({
            url: path,
            success: function (data) {
                var src = $(data).find('.entry-thumbnail img').attr('src');
                if (src) {
                    // Fade out current content
                    $('.carousel').fadeOut(500, function () {
                        // Change content while it is not visible
                        $('.carousel').html('<div><img src="' + src + '" alt="" class="img-cover"></div>');
                        // Fade in new content
                        $('.carousel').fadeIn(500);
                    });
                } else {
                    console.error('Image source not found in post: ' + path);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Failed to load post: ' + path, textStatus, errorThrown);
            }
        });

        currentIndex++; // Move to next index
    };

    loadPost(); // Load the first post initially

    setInterval(loadPost, 7000); // Load next post every 7 seconds (allowing for 1 second of fadeOut and 1 second of fadeIn)
});


function loadYouTubeThumbnails() {
    var currentIndex = 0;
    

    var loadThumbnail = function () {
        if (currentIndex >= videoIds.length) currentIndex = 0; // Reset index if it reaches the end
        var videoId = videoIds[currentIndex];
        var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
        
        // Fade out current content
        $('.youtube-img').fadeOut(500, function () {
            // Change content while it is not visible
            $('.youtube-img').html('<img src="' + thumbnailUrl + '" alt="" class="img-cover">');
            // Fade in new content
            $('.youtube-img').fadeIn(500);
        });

        currentIndex++; // Move to next index
    };

    loadThumbnail(); // Load the first thumbnail initially
    setInterval(loadThumbnail, 7000); // Load next thumbnail every 7 seconds (allowing for 1 second of fadeOut and 1 second of fadeIn)
}

// Call the function when the document is ready
$(document).ready(loadYouTubeThumbnails);

//** YEAR */
function appendCurrentYear() {
    const copyrightElement = document.getElementById('copyright');
    if (!copyrightElement) return; // Exit if element not found
    
    const currentYear = new Date().getFullYear();
    const copyrightMessage = `<i class="far fa-copyright"></i>${currentYear} Swendl. All Rights Reserved`;
    
    copyrightElement.innerHTML = copyrightMessage;
}

document.addEventListener("DOMContentLoaded", function() {
    appendCurrentYear();
});

document.addEventListener('scroll', function() {
    const titles = document.querySelectorAll('.background-title');
    titles.forEach((title, index) => {
        let movement = window.scrollY * 0.08; // Adjust the multiplier for more or less movement
        if(index === 1) {
            movement = -movement; // For 'Upcoming Events', movement to the left
        }
        // Here, we are adding to the existing transform property, ensuring we do not override the original positioning
        title.style.transform = `translate(-50%, -50%) translateX(${movement}px)`;
    });
});

document.getElementById('particles-js').style.height = document.body.scrollHeight + 'px';

particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 50
            },
            "color": {
                "value": "#000000"
            },
            "shape": {
                "type": "circle"
            },
            "size": {
                "value": 1
            },
            "line_linked": {
                "enable": false, // This will remove the lines between particles
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "top",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            },
            "modes": {
                "repulse": {
                    "distance": 100
                }
            }
        }
    }
);












