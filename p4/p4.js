/*global jQuery, Handlebars, Router, alert */
jQuery(function ($) {
	'use strict';

    //This is a block helper used in handlebars
	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

    //these two vars represent key values
	var ENTER_KEY = 13,
        ESCAPE_KEY = 27,
        App = {
            //this function is the first to be called and sets up the vars
            init: function () {
                //this grabs the todo list from local storage
                this.todos = this.store('todos-jquery');
                //this creates the todo template on the webpage.
                this.todoTemplate = Handlebars.compile($('#todo-template').html());
                //this creates the footer or filter template on the bottom
                this.footerTemplate = Handlebars.compile($('#footer-template').html());

                //this is used by the director to route urls
                new Router({
                    '/:filter': function (filter) {
                        this.filter = filter;
                        this.render();
                    }.bind(this)
                }).init('/all');
            },
            //this function grabs or updates data based on the arg list
            store: function (namespace, data) {
                if (arguments.length > 1) {
                    //puts the list of todos in localstorage as a json string
                    return localStorage.setItem(namespace, JSON.stringify(data));
                } else {
                    //retreave the json string of todos
                    var store = localStorage.getItem(namespace);
                    //parse the store if an item exists or return an empty list
                    return (store && JSON.parse(store)) || [];
                }
            },
            pluralize: function (count, word) {
                return count === 1 ? word : word + 's';
            },
            //this will generate unique ids for each todo
            generateUUID: function () {
                var d = new Date().getTime();
                if (window.performance && typeof window.performance.now === "function") {
                    d += performance.now(); //use high-precision timer if available
                }
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            },
            render: function () {
                //this will get the todos based on filters
                var todos = this.getFilteredTodos();
                //this will display the todos on the page based on the todotemplate
                $('#todo-list').html(this.todoTemplate(todos));
                $('#main').toggle(todos.length > 0);
                $('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
                this.renderFooter();
                $('#new-todo').focus();
                //this will update the localstorage
                this.store('todos-jquery', this.todos);
            },
            renderFooter: function () {
                var todoCount = this.todos.length,
                    activeTodoCount = this.getActiveTodos().length,
                    template = this.footerTemplate({
                        activeTodoCount: activeTodoCount,
                        activeTodoWord: this.pluralize(activeTodoCount, 'item'),
                        completedTodos: todoCount - activeTodoCount,
                        filter: this.filter
                    });

                $('#footer').toggle(todoCount > 0).html(template);
            },
            toggleAll: function (e) {
                var isChecked = e.prop('checked');

                this.todos.forEach(function (todo) {
                    todo.completed = isChecked;
                });

                this.render();
            },
            getActiveTodos: function () {
                return this.todos.filter(function (todo) {
                    return !todo.completed;
                });
            },
            getFavouritedTodos: function () {
                return this.todos.filter(function (todo) {
                    return todo.favourite;
                });
            },
            getCompletedTodos: function () {
                return this.todos.filter(function (todo) {
                    return todo.completed;
                });
            },
            getFilteredTodos: function () {
                if (this.filter === 'active') {
                    return this.getActiveTodos();
                }

                if (this.filter === 'completed') {
                    return this.getCompletedTodos();
                }

                if (this.filter === 'favourites') {
                    return this.getFavouritedTodos();
                }
                return this.todos;
            },
            destroyCompleted: function () {
                //this will overwrite the todo list with only active todos
                this.todos = this.getActiveTodos();
                this.filter = 'all';
                this.render();
            },
            // accepts an element from inside the `.item` div and
            // returns the corresponding index in the `todos` array
            indexFromEl: function (el) {
                var id = $(el).closest('li').data('id'),
                    todos = this.todos,
                    i = todos.length;

                while (i--) {
                    if (todos[i].id === id) {
                        return i;
                    }
                }
            },
            create: function (e) {
                var $input = e,
                    val = $input.val().trim();
                if (!val) {
                    return;
                }
                //add new todo to the list
                this.todos.push({
                    id: this.generateUUID(),
                    title: val,
                    favourite: false,
                    completed: false
                });
                $input.val('');
                this.render();
            },
            toggle: function (e) {
                var i = this.indexFromEl(e);
                this.todos[i].completed = !this.todos[i].completed;
                this.render();
            },
            edit: function (e) {
                var $input = e.closest('li').addClass('editing').find('.edit');
                $input.val($input.val()).focus();
            },
            editKeyup: function (e) {
                if (e.which === ENTER_KEY) {
                    e.target.blur();
                }

                if (e.which === ESCAPE_KEY) {
                    $(e.target).data('abort', true).blur();
                }
            },
            update: function (e) {
                var el = e,
                    $el = $(el),
                    val = $el.val().trim();

                if (!val) {
                    this.destroy(e);
                    return;
                }

                if ($el.data('abort')) {
                    $el.data('abort', false);
                } else {
                    this.todos[this.indexFromEl(el)].title = val;
                }

                this.render();
            },
            favourite: function (e) {
                e.prop("checked");
                var val = e.is(":checked");
                this.todos[this.indexFromEl(e)].favourite = val;
                this.render();
            },
            destroy: function (e) {
                this.todos.splice(this.indexFromEl(e), 1);
                this.render();
            }
        };

	App.init();

    //These are the bindings that allow functionality between the HTML and the DOM
    $('#new-todo').on('keyup', function (e) {
        if (e.which === ENTER_KEY) {
            App.create($(this));
        }
    });

    $('#todo-list').on('click', '.favourite', function (e) {
        App.favourite($(this));
    });

    $('#todo-list').on('change', '.toggle', function (e) {
        App.toggle($(this));
    });
    $('#todo-list').on('dblclick', 'label', function (e) {
        App.edit($(this));
    });
    $('#todo-list').on('focusout', '.edit', function (e) {
        App.update($(this));
    });
    $('#todo-list').on('click', '.destroy', function (e) {
        App.destroy($(this));
    });

    $('#todo-list').on('keyup', '.edit', App.editKeyup.bind(this));

    $('#toggle-all').on('change', function (e) {
        App.toggleAll($(this));
    });

    $('#footer').on('click', '#clear-completed', function (e) {
        App.destroyCompleted();
    });


});
