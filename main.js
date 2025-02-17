// Function to get template information from the directory structure
function getTemplates() {
    // For a static site, we'll hardcode the template folders array
    // but organize it in a maintainable way
    const templateFolders = [
        {
            folder: 'landing-page',
            info: {
                name: "Landing Page",
                description: "A clean and modern landing page with hero section and features",
                thumbnail: "templates/landing-page/assets/thumbnail.png",
                path: "templates/landing-page/index.html"
            }
        }
    ];

    return templateFolders.map(t => t.info);
}

// Function to render template cards
function renderTemplateCards() {
    const templateList = document.getElementById('template-list');
    const templates = getTemplates();
    
    templateList.innerHTML = ''; // Clear existing content
    
    templates.forEach(template => {
        const card = `
            <div class="col-12 mb-4">
                <div class="card">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <img src="${template.thumbnail}" class="template-preview w-100 h-100" alt="${template.name}">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body d-flex flex-column h-100">
                                <div>
                                    <h5 class="card-title">${template.name}</h5>
                                    <p class="card-text">${template.description}</p>
                                </div>
                                <div class="mt-auto text-end">
                                    <a href="${template.path}" class="btn btn-primary">View Template</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        templateList.innerHTML += card;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderTemplateCards); 