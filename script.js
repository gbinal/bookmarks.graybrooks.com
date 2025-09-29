// Enhanced interactivity for the bookmarks page
document.addEventListener('DOMContentLoaded', function() {
    // Add dynamic time-based greeting
    updateGreeting();
    
    // Add search functionality
    addSearchFeature();
    
    // Add click tracking (just console logging for demo)
    trackClicks();
    
    // Update greeting based on time of day
    function updateGreeting() {
        const now = new Date();
        const hour = now.getHours();
        const subtitle = document.querySelector('.subtitle');
        
        let greeting;
        if (hour < 12) {
            greeting = 'Good morning! Ready to start the day?';
        } else if (hour < 18) {
            greeting = 'Good afternoon! Keep up the great work!';
        } else {
            greeting = 'Good evening! Time to unwind?';
        }
        
        // Optionally update the subtitle with time-based greeting
        // subtitle.textContent = greeting;
    }
    
    // Add simple search functionality
    function addSearchFeature() {
        // Create search input
        const header = document.querySelector('header');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="bookmark-search" placeholder="Search bookmarks...">
        `;
        header.appendChild(searchContainer);
        
        // Add search styles
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                margin-top: 1rem;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }
            
            #bookmark-search {
                width: 100%;
                padding: 0.75rem 1rem;
                border: none;
                border-radius: 25px;
                background: rgba(255,255,255,0.2);
                color: white;
                font-size: 1rem;
                outline: none;
                backdrop-filter: blur(10px);
            }
            
            #bookmark-search::placeholder {
                color: rgba(255,255,255,0.7);
            }
            
            #bookmark-search:focus {
                background: rgba(255,255,255,0.3);
                box-shadow: 0 0 20px rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
        
        // Add search functionality
        const searchInput = document.getElementById('bookmark-search');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const bookmarkLinks = document.querySelectorAll('.bookmark-link');
            const categories = document.querySelectorAll('.bookmark-category');
            
            categories.forEach(category => {
                let hasVisibleLinks = false;
                const links = category.querySelectorAll('.bookmark-link');
                
                links.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    if (linkText.includes(searchTerm)) {
                        link.style.display = 'block';
                        hasVisibleLinks = true;
                    } else {
                        link.style.display = 'none';
                    }
                });
                
                // Hide category if no links match
                category.style.display = hasVisibleLinks ? 'block' : 'none';
            });
        });
    }
    
    // Track bookmark clicks for analytics (demo)
    function trackClicks() {
        const bookmarkLinks = document.querySelectorAll('.bookmark-link');
        bookmarkLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Prevent default for demo links
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                // Log the click (in a real app, you'd send this to analytics)
                console.log('Bookmark clicked:', link.textContent);
                
                // Add visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus search with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('bookmark-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Clear search with Escape
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('bookmark-search');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.blur();
                // Reset visibility
                document.querySelectorAll('.bookmark-link, .bookmark-category').forEach(el => {
                    el.style.display = '';
                });
            }
        }
    });
});