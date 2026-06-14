// ============================================
// Todo Application - Vanilla JavaScript
// Stores todos in localStorage for persistence
// Uses event delegation for better performance
// Based on TodoMVC open-source architecture
// ============================================

class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.todoList = document.getElementById('todo-list');
        this.emptyState = document.getElementById('empty-state');
        this.tasksLeft = document.getElementById('tasks-left');
        this.clearCompletedBtn = document.getElementById('clear-completed');
        this.filterBtns = document.querySelectorAll('.filter-btn');

        // Form submit: add new todo
        this.todoForm.addEventListener('submit', (e) => this.addTodo(e));

        // Clear completed button
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });

        // Event delegation: handle checkbox toggle, delete, and edit on the todo list
        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            const id = Number(todoItem.dataset.id);

            if (e.target.classList.contains('todo-checkbox')) {
                this.toggleTodo(id);
            } else if (e.target.closest('.btn-delete')) {
                this.deleteTodo(id);
            }
        });

        // Event delegation: handle double-click to edit
        this.todoList.addEventListener('dblclick', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            // Don't trigger edit when clicking checkbox or delete button
            if (e.target.classList.contains('todo-checkbox') || e.target.closest('.btn-delete')) return;

            const id = Number(todoItem.dataset.id);
            this.startEdit(id, todoItem);
        });

        // Handle pressing Enter key to finish editing
        this.todoList.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
                e.preventDefault();
                const todoItem = e.target.closest('.todo-item');
                const id = Number(todoItem.dataset.id);
                this.finishEdit(id, e.target.value.trim());
            } else if (e.key === 'Escape' && e.target.classList.contains('edit-input')) {
                e.preventDefault();
                this.render();
            }
        });

        // Handle blur on edit input (click away to save)
        this.todoList.addEventListener('blur', (e) => {
            if (e.target.classList.contains('edit-input')) {
                const todoItem = e.target.closest('.todo-item');
                const id = Number(todoItem.dataset.id);
                this.finishEdit(id, e.target.value.trim());
            }
        }, true); // Use capture phase since blur doesn't bubble

        this.render();
    }

    addTodo(e) {
        e.preventDefault();
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.save();
        this.todoInput.value = '';
        this.todoInput.focus();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    clearCompleted() {
        const hadCompleted = this.todos.some(t => t.completed);
        if (!hadCompleted) return;
        this.todos = this.todos.filter(t => !t.completed);
        this.save();
        this.render();
    }

    startEdit(id, todoItem) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo || todo.completed) return;

        const textSpan = todoItem.querySelector('.todo-text');
        const currentText = textSpan.textContent;

        // Replace span with input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = currentText;
        textSpan.replaceWith(input);
        input.focus();
        // Place cursor at end
        input.setSelectionRange(input.value.length, input.value.length);
    }

    finishEdit(id, newText) {
        if (!newText) {
            // Empty text: delete the todo
            this.deleteTodo(id);
            return;
        }
        const todo = this.todos.find(t => t.id === id);
        if (todo && todo.text !== newText) {
            todo.text = newText;
            this.save();
            this.render();
        } else if (todo && todo.text === newText) {
            // No change, just re-render
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }

    render() {
        const filtered = this.getFilteredTodos();
        const activeCount = this.todos.filter(t => !t.completed).length;
        const completedCount = this.todos.filter(t => t.completed).length;

        // Update stats
        this.tasksLeft.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
        this.clearCompletedBtn.disabled = completedCount === 0;

        // Render list
        if (filtered.length === 0) {
            this.todoList.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            this.emptyState.querySelector('p').textContent =
                this.todos.length === 0
                    ? '🎉 No tasks yet! Add one above.'
                    : 'No tasks match the current filter.';
        } else {
            this.emptyState.classList.add('hidden');
            this.todoList.innerHTML = filtered.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <input
                        type="checkbox"
                        class="todo-checkbox"
                        ${todo.completed ? 'checked' : ''}
                        aria-label="${todo.completed ? 'Mark incomplete' : 'Mark complete'}"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <span class="todo-date">${this.formatDate(todo.createdAt)}</span>
                    <button
                        class="btn-delete"
                        title="Delete task"
                        aria-label="Delete task"
                    >🗑️</button>
                </li>
            `).join('');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});
