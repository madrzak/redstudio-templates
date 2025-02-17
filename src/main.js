import { templates } from './templates.config.js';

// Function to get template information
function getTemplates() {
    return templates.map(t => t.info);
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
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <h5 class="card-title">${template.name}</h5>
                                        <p class="card-text">${template.description}</p>
                                    </div>
                                    <div class="btn-container">
                                        <a href="${template.path}" class="btn btn-primary">View</a>
                                    </div>
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