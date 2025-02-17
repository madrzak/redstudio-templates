// This will store our template information
const templates = [
    {
        name: "Simple Landing Page",
        description: "A clean and modern landing page with hero section and features",
        thumbnail: "https://via.placeholder.com/800x600/764ba2/ffffff?text=Landing+Page",
        path: "templates/landing-page/index.html"
    }
    // More templates can be added here
];

// Function to render template cards
function renderTemplateCards() {
    const templateList = document.getElementById('template-list');
    
    templates.forEach(template => {
        const card = `
            <div class="col-md-4">
                <div class="card template-card">
                    <img src="${template.thumbnail}" class="card-img-top template-preview" alt="${template.name}">
                    <div class="card-body">
                        <h5 class="card-title">${template.name}</h5>
                        <p class="card-text">${template.description}</p>
                        <a href="${template.path}" class="btn btn-primary">View Template</a>
                    </div>
                </div>
            </div>
        `;
        templateList.innerHTML += card;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderTemplateCards); 