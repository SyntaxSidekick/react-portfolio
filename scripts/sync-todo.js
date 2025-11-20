#!/usr/bin/env node

/**
 * Todo Sync Script
 * Syncs between TODO-LIST.md and .tasks/todo-manager.html
 * 
 * Usage:
 *   npm run todo:sync      - Update HTML from TODO-LIST.md
 *   npm run todo:update    - Update TODO-LIST.md from HTML local storage
 */

const fs = require('fs');
const path = require('path');

const TODO_MD_PATH = path.join(__dirname, '../TODO-LIST.md');
const HTML_PATH = path.join(__dirname, '../.tasks/todo-manager.html');

// Parse TODO-LIST.md and extract tasks with their completion status
function parseTodoMarkdown(content) {
    const sections = {
        urgent: { title: '🔥 URGENT - Portfolio Management System', tasks: [] },
        priority1: { title: '🚀 Do First (30 minutes) - #1', tasks: [] },
        priority2: { title: '🎯 Image Organization & Asset Structure - #2 PRIORITY', tasks: [] },
        doNext: { title: '⚡ Do Next (2 hours)', tasks: [] },
        doEventually: { title: '🔮 Do Eventually (4+ hours)', tasks: [] },
        active: { title: '🎨 Active Development', tasks: [] },
        future: { title: '📋 Future Enhancements', tasks: [] }
    };

    const lines = content.split('\n');
    let currentSection = null;
    let currentTask = null;
    let taskContent = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect section headers
        if (line.includes('URGENT') && line.includes('Portfolio Management')) currentSection = 'urgent';
        else if (line.includes('Do First') && line.includes('#1')) currentSection = 'priority1';
        else if (line.includes('Image Organization & Asset Structure')) currentSection = 'priority2';
        else if (line.includes('Do Next') && line.includes('2 hours')) currentSection = 'doNext';
        else if (line.includes('Do Eventually') && line.includes('4+')) currentSection = 'doEventually';
        else if (line.includes('Active Development')) currentSection = 'active';
        else if (line.includes('Future Enhancements')) currentSection = 'future';

        // Detect main tasks (top-level checkboxes)
        const taskMatch = line.match(/^- \[([ x])\] (.+)/);
        if (taskMatch && currentSection) {
            // Save previous task if exists
            if (currentTask) {
                currentTask.description = taskContent.join('\n');
                sections[currentSection].tasks.push(currentTask);
                taskContent = [];
            }

            // Start new task
            currentTask = {
                completed: taskMatch[1] === 'x',
                title: taskMatch[2].trim(),
                description: '',
                metadata: {
                    urgent: false,
                    estimatedTime: null
                }
            };

            // Check for metadata in title
            if (currentTask.title.includes('URGENT') || currentTask.title.includes('Friday')) {
                currentTask.metadata.urgent = true;
            }
            const timeMatch = currentTask.title.match(/(\d+[-\s]*\d*)\s*h/);
            if (timeMatch) {
                currentTask.metadata.estimatedTime = timeMatch[0];
            }

        } else if (currentTask && line.trim().startsWith('-') && !line.match(/^- \[/)) {
            // Subtask or description line
            taskContent.push(line);
        } else if (currentTask && line.trim() && !line.startsWith('#')) {
            // Continue description
            taskContent.push(line);
        } else if (line.trim() === '' || line.startsWith('##')) {
            // End of task or section
            if (currentTask) {
                currentTask.description = taskContent.join('\n');
                if (currentSection) {
                    sections[currentSection].tasks.push(currentTask);
                }
                currentTask = null;
                taskContent = [];
            }
        }
    }

    // Save last task
    if (currentTask && currentSection) {
        currentTask.description = taskContent.join('\n');
        sections[currentSection].tasks.push(currentTask);
    }

    return sections;
}

// Generate data injection script for HTML
function generateDataInjection(todoData) {
    const dataJson = JSON.stringify(todoData, null, 2);
    
    return `
    <script>
        // Auto-injected todo data from TODO-LIST.md
        const injectedData = ${dataJson};
        
        // Merge with localStorage or use injected data
        const existingData = localStorage.getItem('portfolioTodoData');
        if (!existingData) {
            todoData = injectedData;
            localStorage.setItem('portfolioTodoData', JSON.stringify(todoData));
            console.log('Loaded todo data from TODO-LIST.md');
        } else {
            console.log('Using existing localStorage data');
        }
    </script>
    `;
}

// Update HTML file with latest TODO data
function syncToHtml() {
    console.log('📖 Reading TODO-LIST.md...');
    const todoContent = fs.readFileSync(TODO_MD_PATH, 'utf8');
    
    console.log('🔍 Parsing tasks...');
    const todoData = parseTodoMarkdown(todoContent);
    
    // Count tasks
    let totalTasks = 0;
    let completedTasks = 0;
    Object.values(todoData).forEach(section => {
        totalTasks += section.tasks.length;
        completedTasks += section.tasks.filter(t => t.completed).length;
    });
    
    console.log(`✅ Found ${totalTasks} tasks (${completedTasks} completed)`);
    
    console.log('📝 Updating HTML file...');
    let htmlContent = fs.readFileSync(HTML_PATH, 'utf8');
    
    // Inject data before the closing </body> tag
    const injection = generateDataInjection(todoData);
    htmlContent = htmlContent.replace('</body>', `${injection}\n</body>`);
    
    fs.writeFileSync(HTML_PATH, htmlContent);
    
    console.log('✨ HTML file updated successfully!');
    console.log(`📊 Stats: ${totalTasks} tasks, ${completedTasks} completed (${Math.round(completedTasks/totalTasks*100)}%)`);
}

// Main execution
try {
    syncToHtml();
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
