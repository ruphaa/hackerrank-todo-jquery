$(document).ready(function() {
    if(localStorage['todos']) {
        todo = new Todo(JSON.parse(localStorage.getItem('todos')));
        todos = todo.todos;
        counter = todos.length;
    }else{
       todos = new Todo([]);
       counter = 0;
    }
    updateItemsCounter(counter);
    for(let i=0;i<todos.length;i++){
        appendToTaskList(todos[i]);
    }
});

// Event listeners

$('#todo-input').keypress(function(e) {
    if (e.which == 13) {
        var item = $('#todo-input').val();
        // call addTodoItem method
        todo.addTodoItem(item);
        appendToTaskList(item);
        counter++;
        updateItemsCounter(counter);
        $('#todo-input').val('').focus();
    }
    
});

$('.list-wrapper').on('click', '.remove-item', function(){
    var item = $(this).siblings('.item-desc').text();
    // remove function method is called
    todo.removeTodoItem(item);
    counter--;
    updateItemsCounter(counter);
    $(this).parents('.item-wrapper').remove();
});


$('.list-wrapper').on('change', '#checkBox', function() {
    if($(this).is(':checked')) {
        // change the counter in the status wrapper
        $(this).parents('.checkbox-wrapper').siblings('.item-desc').addClass('done');
        counter--;
        updateItemsCounter(counter);
    }else {
        $(this).parents('.checkbox-wrapper').siblings('.item-desc').removeClass('done');
        counter++;
        updateItemsCounter(counter);
    }
});

function appendToTaskList(item) {
    $('.list-wrapper').append(`<div class="item-wrapper">
        <div class="checkbox-wrapper">
            <input type="checkbox" id="checkBox" />
        </div>
        <div class="item-desc">${item}</div>
        <div class="remove-item">&times</div>
    </div>`);
}

function updateItemsCounter(counter) {
    $('.status-wrapper').text(`${counter} items left`);
}
// Functionalities

class Todo {
    constructor(todos) {
        this.todos = todos;
    }

    addTodoItem(item) {
        this.todos.push(item);
        console.log(this.todos);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    removeTodoItem(item) {
        for(var i = this.todos.length-1; i >= 0; i--){
            if (this.todos[i] === item) this.todos.splice(i, 1);
        }
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

