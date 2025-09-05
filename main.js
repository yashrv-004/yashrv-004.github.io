document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and insert a component
    const loadComponent = (componentPath, placeholderId) => {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                } else {
                    console.error(`Placeholder with ID ${placeholderId} not found.`);
                }
            })
            .catch(error => {
                console.error('Error loading component:', error);
            });
    };

    // Load header and footer
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});
