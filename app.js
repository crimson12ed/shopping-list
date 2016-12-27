(function() {
"use strict";

// Single state object
var state = {
    items: []
};

// State modification functions
function addItem(state, itemName) {
    var item = {};
	item.name = itemName;
	item.checked = false;
    state.items.push(item);
}

function deleteItem(state, itemName) {
    for (var idx = 0; idx < state.items.length; idx++) {
        if (state.items[idx].name === itemName) {
            state.items.splice(idx, 1);

            break;
        }
    }
}

function toggleChecked(state, itemName) {
    for (var idx = 0; idx < state.items.length; idx++) {
        if (state.items[idx].name === itemName) {
            state.items[idx].checked = !state.items[idx].checked;

            break;
        }
    }
}

// Render functions
function renderList(state, element) {
    var itemsHTML = state.items.map(function(item) {
        var checkedClass = "";
        if (item.checked) {
            checkedClass = "shopping-item__checked";
        }

        return ('<li><span class="shopping-item ' + checkedClass + '">' + item.name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button> <button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>');
    });
    element.html(itemsHTML);
}

$(document).ready(function() {
    // Add sample list to state
    $('.shopping-item').each(function() {
        addItem(state, $(this).text());

        if ($(this).hasClass('shopping-item__checked')) toggleChecked(state, $(this).text());
    });

    // Add Item Listener
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();

        addItem(state, $('#shopping-list-entry').val());
        renderList(state, $('.shopping-list'));
    });

    // Toggle Checked Listener
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
        event.preventDefault();

        var item = $(this).parent().siblings('.shopping-item').text();
        toggleChecked(state, item);
        renderList(state, $('.shopping-list'));
    });

    // Toggle Delete Listener
    $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
        event.preventDefault();

        var item = $(this).parent().siblings('.shopping-item').text();
        deleteItem(state, item);
        renderList(state, $('.shopping-list'));
    });
});

})();
