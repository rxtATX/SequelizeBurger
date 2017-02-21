$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burger
  var newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgerContainer
  var burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.delete", deleteBurger);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".burger-item", editBurger);
  $(document).on("keyup", ".burger-item", finishEdit);
  $(document).on("blur", ".burger-item", cancelEdit);
  $(document).on("submit", "#burger-form", insertBurger);

  // Our initial burgers array
  var burgers;

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a burger when the user clicks the delete button
  function deleteBurger() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/" + id
    })
    .done(function() {
      getBurgers();
    });
  }

  // This function sets a burgers complete attribute to the opposite of what it is
  // and then runs the updateBurger function
  function toggleComplete() {
    var burger = $(this)
      .parent()
      .data("burger");
    if (burger.devoured === false) {
        console.log("inside");
         burger.devoured = true;
         console.log(burger.devoured);
    }
    updateBurger(burger);
  }

  // This function handles showing the input box for a user to edit a burger
  function editBurger() {
    var currentBurger = $(this).data("burger");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentBurger.burger_name);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }

  // This function starts updating a burger in the database if a user hits the
  // "Enter Key" While in edit mode
  function finishEdit(event) {
    var updatedBurger;
    if (event.key === "Enter") {
      updatedBurger = {
        id: $(this)
          .data("burger")
          .id,
        burger_name: $(this)
          .children("input")
          .val()
          .trim()
      };
      console.log(updatedBurger);
      $(this).blur();
      updateBurger(updatedBurger);
    }
  }

  // This function updates a burger in our database
  function updateBurger(burger) {
      console.log(burger);
    $.ajax({
      method: "PUT",
      url: "/api",
      data: burger
    })
    .done(function() {
      getBurgers();
    });
  }

  // This function is called whenever a burger item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentBurger = $(this).data("burger");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentBurger.text);
    $(this)
      .children("span")
      .show();
    $(this)
      .children("button")
      .show();
  }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item burger-item");
    var newBurgerSpan = $("<span>");
    newBurgerSpan.text(burger.burger_name);
    newInputRow.append(newBurgerSpan);
    var newBurgerInput = $("<input>");
    newBurgerInput.attr("type", "text");
    newBurgerInput.addClass("edit");
    newBurgerInput.css("display", "none");
    newInputRow.append(newBurgerInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", burger.id);
    var newCompleteBtn = $("<button>");
    newCompleteBtn.addClass("complete btn btn-default");
    newCompleteBtn.text("✓");
    newInputRow.append(newDeleteBtn);
    newInputRow.append(newCompleteBtn);
    newInputRow.data("burger", burger);
    if (burger.devoured === true) {
      newBurgerSpan.css("text-decoration", "line-through");
    }
    return newInputRow;
  }

  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {   return; }
    var burger = {
      burger_name: newItemInput
        .val()
        .trim(),
      devoured: false
    };

    // Posting the new burger, calling getBurgers when done
    $.post("/api", burger, function() {
      getBurgers();
    });
    newItemInput.val("");
  }

});
