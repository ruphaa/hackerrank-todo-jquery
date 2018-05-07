class Todo {
    constructor() {
        this.items = [];
        this.remainingCount = 0;
    }

    updateCount() {
        const incompleteItems = this.items.filter(item => !item.done)
        this.remainingCount = incompleteItems.length;
    }

    loadItemsFromStorage() {
        if (localStorage['todos']) {
            const itemsFromStorage = JSON.parse(localStorage.getItem('todos'));
            this.items = itemsFromStorage;
            this.updateCount();
        }
    }

    addItem(item) {
        this.items.push(item);
        this.updateCount();
        this.saveStateToStorage();
    }

    removeItem(itemId) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].id === itemId) this.items.splice(i, 1);
        }
        this.updateCount();
        this.saveStateToStorage();
    }

    markItemAsDone(itemId) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].id === itemId) {
                this.items[i].done = true;
            }
        }
        this.updateCount();
        this.saveStateToStorage();
    }

    markItemAsPending(itemId) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].id === itemId) {
                this.items[i].done = false;
            }
        }
        this.updateCount();
        this.saveStateToStorage();
    }

    saveStateToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.items));
    }
}

const appendToTaskList = function (item) {
    $('.list-wrapper').append(
        `<div class="item-wrapper ${item.done ? 'done' : ''}">
            <div class="checkbox-wrapper">
                <input type="checkbox" class="todo-check" ${item.done ? "checked" : ""} />
            </div>
            <div class="item-desc">${item.desc}</div>
            <div class="remove-item">&times</div>
            <input type="hidden" class="todo-id" value="${item.id}"/>
        </div>`
    );
};

const updateItemsCounter = function (counter) {
    $('.status-wrapper').text(`${counter} items left`);
};

$(document).ready(function () {
    const todo = new Todo();
    todo.loadItemsFromStorage();

    for (let i = 0; i < todo.items.length; i++) {
        appendToTaskList(todo.items[i]);
    }
    updateItemsCounter(todo.remainingCount);

    $('#todo-input').keypress(function (e) {
        if (e.which == 13) {
            // const item = $('#todo-input').val();
            const desc = $('#todo-input').val();
            const id = Date.now();
            const item = { id, desc };
            todo.addItem(item);
            appendToTaskList(item);
            updateItemsCounter(todo.remainingCount);
            $('#todo-input').val('').focus();
        }
    });

    $('.list-wrapper').on('click', '.remove-item', function () {
        const todoId = $(this).siblings('.todo-id').val();
        todo.removeItem(Number(todoId));
        updateItemsCounter(todo.remainingCount);
        $(this).parents('.item-wrapper').remove();
    });


    $('.list-wrapper').on('change', '.todo-check', function () {
        if ($(this).is(':checked')) {
            const todoId = $(this).parents('.checkbox-wrapper').siblings('.todo-id').val();
            todo.markItemAsDone(Number(todoId));
            updateItemsCounter(todo.remainingCount);
            $(this).parents('.item-wrapper').addClass('done');
        } else {
            const todoId = $(this).parents('.checkbox-wrapper').siblings('.todo-id').val();
            todo.markItemAsPending(Number(todoId));
            updateItemsCounter(todo.remainingCount);
            $(this).parents('.item-wrapper').removeClass('done');
        }
    });
});
