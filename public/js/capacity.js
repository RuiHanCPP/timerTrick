(function() {
  var activateButtons, activateEditItem, clearDivMessage, createMessage, deactivateButtons, deleteItem, detachRow, divMessage, getEditData, getEditDiff, main, populateItemEdit, sendEditDiff, saveEdit, cancelEdit;
  main = function() {
    $(".spgear-rangepicker").spgearRangepicker();
    $(".scrumRole-container").on("mouseenter", ".scrumRole-row", function() {
      return $(this).find(".scrumRole-modify-group").css("visibility", "visible");
    });
    $(".scrumRole-container").on("mouseleave", ".scrumRole-row", function() {
      return $(this).find(".scrumRole-modify-group").css("visibility", "hidden");
    });
    $(".scrumRole-container").on("click", ".scrumRole-edit", function(ev) {
      ev.preventDefault();
      return activateEditItem($(this).parents(".scrumRole-content"), ".scrumRole-modify-group", "scrumrole-edit-url");
    });
    $(".scrumRole-container").on("click", ".scrumRole-cancel", function(ev) {
      ev.preventDefault();
      return cancelEdit($(this).parents("form"), ".scrumRole-content", ".scrumRole-modify-group");
    });
    $(".scrumRole-container").on("click", ".scrumRole-save", function(ev) {
      ev.preventDefault();
      return saveEdit($(this).parents("form"), ".scrumRole-content", "scrumrole-url", ".scrumRole-modify-group");
    });
    $(".scrumRole-container").on("click", ".scrumRole-delete", function(ev) {
      ev.preventDefault();
      return deleteItem($(this).parents(".scrumRole-content"), ".scrumRole-modify-group", "scrumrole-url", ".scrumRole-row");
    });
    $(".scrumteam-container").on("mouseenter", ".scrumteam-row", function() {
      return $(this).find(".scrumteam-modify-group").css("visibility", "visible");
    });
    $(".scrumteam-container").on("mouseleave", ".scrumteam-row", function() {
      return $(this).find(".scrumteam-modify-group").css("visibility", "hidden");
    });
    $(".scrumteam-container").on("click", ".scrumteam-edit", function(ev) {
      ev.preventDefault();
      return activateEditItem($(this).parents(".scrumteam-content"), ".scrumteam-modify-group", "scrumteam-edit-url");
    });
    $(".scrumteam-container").on("click", ".scrumteam-cancel", function(ev) {
      ev.preventDefault();
      return cancelEdit($(this).parents("form"), ".scrumteam-content", ".scrumteam-modify-group");
    });
    $(".skill-container").on("mouseenter", ".skill-row", function() {
      return $(this).find(".skill-delete-group").css("visibility", "visible");
    });
    $(".skill-container").on("mouseleave", ".skill-row", function() {
      return $(this).find(".skill-delete-group").css("visibility", "hidden");
    });
    $(".skill-container").on("click", ".skill-delete", function(ev) {
      ev.preventDefault();
      return deleteItem($(this).parents(".skill-content"), ".skill-delete-group", "skill-url", ".skill-row");
    });
    $(".scrumRoleName-container").on("mouseenter", ".scrumRoleName-row", function() {
      return $(this).find(".scrumRoleName-delete-group").css("visibility", "visible");
    });
    $(".scrumRoleName-container").on("mouseleave", ".scrumRoleName-row", function() {
      return $(this).find(".scrumRoleName-delete-group").css("visibility", "hidden");
    });
    $(".scrumRoleName-container").on("click", ".scrumRoleName-delete", function(ev) {
      ev.preventDefault();
      return deleteItem($(this).parents(".scrumRoleName-content"), ".scrumRoleName-delete-group", "scrumrolename-url", ".scrumRoleName-row");
    });
    $(".usersSkill-container").on("mouseenter", ".usersSkill-row", function() {
      return $(this).find(".usersSkill-delete-group").css("visibility", "visible");
    });
    $(".usersSkill-container").on("mouseleave", ".usersSkill-row", function() {
      return $(this).find(".usersSkill-delete-group").css("visibility", "hidden");
    });
    $(".usersSkill-container").on("click", ".usersSkill-delete", function(ev) {
      ev.preventDefault();
      return deleteItem($(this).parents(".usersSkill-content"), ".usersSkill-delete-group", "usersskill-url", ".usersSkill-row");
    });
    $("form.usersSkill-add").submit(function(ev) {
      if ($(this).find(":input[name=usr]").val().length) {
        return;
      }
      ev.preventDefault();
      return divMessage($(this), "error", "Must provide a user", true);
    });
    $(".activity-container").on("mouseenter", ".activity-row", function() {
      return $(this).find(".activity-modify-group").css("visibility", "visible");
    });
    $(".activity-container").on("mouseleave", ".activity-row", function() {
      return $(this).find(".activity-modify-group").css("visibility", "hidden");
    });
    $("form.activity-create").submit(function(ev) {
      if ($(this).find(":input[name=usr]").val().length) {
        return;
      }
      ev.preventDefault();
      return divMessage($(this), "error", "Must provide a user", true);
    });
    $(".activity-container").on("click", ".activity-delete", function(ev) {
      ev.preventDefault();
      return deleteItem($(this).parents(".activity-content"), ".activity-modify-group", "activity-url", ".activity-row");
    });
    $(".activity-container").on("click", ".activity-edit", function(ev) {
      ev.preventDefault();
      return activateEditItem($(this).parents(".activity-content"), ".activity-modify-group", "activity-edit-url");
    });
    $(".activity-container").on("click", ".activity-cancel", function(ev) {
      ev.preventDefault();
      return cancelEdit($(this).parents("form"), ".activity-content", ".activity-modify-group");
    });
    $(".scrumteam-container").on("click", ".scrumteam-save", function(ev) {
      ev.preventDefault();
      return saveEdit($(this).parents("form"), ".scrumteam-content", "scrumteam-url", ".scrumteam-modify-group");
    });
    return $(".activity-container").on("click", ".activity-save", function(ev) {
      ev.preventDefault();
      return saveEdit($(this).parents("form"), ".activity-content", "activity-url", ".activity-modify-group");
    });
  };
  deleteItem = function(showItem, buttons, url, rowClass) {
    var req;
    deactivateButtons(showItem, buttons);
    divMessage(showItem, "info", "Deleting...");
    req = $.ajax({
      url: showItem.data(url),
      type: "DELETE"
    });
    req.done(function() {
      divMessage(showItem, "success", "Deleted!");
      return detachRow(showItem, rowClass);
    });
    return req.fail(function(req, textStatus) {
      return divMessage(showItem, "error", "Error deleting: " + req.statusText);
    });
  };
  detachRow = function(showItem, rowClass) {
    var row;
    row = showItem.parents(rowClass);
    return row.fadeOut(400, function() {
      return row.detach();
    });
  };
  activateEditItem = function(showItem, buttons, url) {
    var req;
    deactivateButtons(showItem, buttons);
    divMessage(showItem, "info", "Retreiving edit data...");
    req = $.ajax({
      url: showItem.data(url),
      dataType: "html"
    });
    req.done(function(html) {
      clearDivMessage(showItem);
      return populateItemEdit(showItem, html);
    });
    return req.fail(function(req) {
      return divMessage(showItem, "error", "Error retreiving edit data: " + req.statusText);
    });
  };
  populateItemEdit = function(showItem, html) {
    var editItem;
    showItem.css("display", "none");
    editItem = $(html).insertAfter(showItem);
    editItem.find(".spgear-rangepicker").spgearRangepicker();
    return showItem.data("oldData", getEditData(editItem));
  };
  getEditData = function(showAct) {
    var data, em, _i, _len, _ref;
    data = {};
    _ref = showAct.find(":input[name]");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      em = _ref[_i];
      data[$(em).attr("name")] = $(em).val();
    }
    return data;
  };
  getEditDiff = function(oldData, newData) {
    var diff, key, newVal, oldVal;
    diff = {};
    for (key in oldData) {
      oldVal = oldData[key];
      newVal = newData[key];
      if (newVal !== oldVal) {
        diff[key] = newVal;
      }
    }
    return diff;
  };
  sendEditDiff = function(showItem, diff, url, buttons) {
    var req;
    divMessage(showItem, "info", "Modifying item...");
    req = $.ajax({
      url: showItem.data(url),
      type: "POST",
      data: diff
    });
    req.done(function(html) {
      return showItem.replaceWith($(html));
    });
    return req.fail(function(req) {
      activateButtons(showItem, buttons);
      return divMessage(showItem, "error", "Error editing item: " + req.statusText);
    });
  };
  saveEdit = function(editItem, content, url, buttons) {
    var diff, k, oldData, showItem;
    showItem = editItem.siblings(content);
    oldData = showItem.data("oldData");
    editItem.detach();
    showItem.css("display", "");
    diff = getEditDiff(oldData, getEditData(editItem));
    if (((function() {
      var _results;
      _results = [];
      for (k in diff) {
        _results.push(k);
      }
      return _results;
    })()).length > 0) {
      return sendEditDiff(showItem, diff, url, buttons);
    } else {
      activateButtons(showItem, buttons);
      return divMessage(showItem, "warning", "No changes were made", true);
    }
  };
  cancelEdit = function(editItem, content, buttons) {
      var showItem;
      showItem = editItem.siblings(content);
      editItem.detach();
      activateButtons(showItem, buttons);
      return showItem.css("display", "");
  };
  deactivateButtons = function(showItem, buttons) {
    return showItem.find(buttons).css("display", "none");
  };
  activateButtons = function(showItem, buttons) {
    var btn;
    btn = showItem.find(buttons);
    return btn.css("visibility", "hidden").css("display", "");
  };
  divMessage = function(div, type, text, fade) {
    var msg;
    clearDivMessage(div);
    msg = createMessage(type, text).addClass("div-message").appendTo(div);
    if (fade) {
      return msg.delay(1000).fadeOut(400, function() {
        return $(this).detach();
      });
    }
  };
  clearDivMessage = function(div) {
    return div.find(".div-message").detach();
  };
  createMessage = function(type, text) {
    return $("<strong>").addClass("text-" + type).text(text);
  };
  $(document).ready(function() {
    return main();
  });
}).call(this);
