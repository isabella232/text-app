/**
 * @constructor
 */
function TextDrive() {
  this.editor_ = null;
  this.tabs_ = null;
  this.dialogController_ = null;
  this.menuController_ = null;
  this.windowController_ = null;
  this.hasFrame_ = false;
}

/**
 * Called when all the resources have loaded. All initializations should be done
 * here.
 */
TextDrive.prototype.init = function() {
  this.dialogController_ = new DialogController($('#dialog-container'))
  this.editor_ = new Editor('editor');
  this.tabs_ = new Tabs(this.editor_, this.dialogController_);
  this.menu_controller_ = new MenuController(this.tabs_);
  this.windowController_ = new WindowController(this.editor_);
  this.searchController_ = new SearchController(this.editor_);
  this.hotkeysController_ = new HotkeysController(this.tabs_, this.editor_);
  this.settingsController_ = new SettingsController();

  chrome.runtime.getBackgroundPage(function(bg) {
    bg.onWindowReady(this);
  }.bind(this));
};

/**
 * @param {Array.<FileEntry>} entries The file entries to be opened.
 *
 * Open one tab per file. Usually called from the background page.
 */
TextDrive.prototype.openEntries = function(entries) {
  for (var i = 0; i < entries.length; i++) {
    this.tabs_.openFileEntry(entries[i]);
  }
};

TextDrive.prototype.openNew = function() {
  this.tabs_.newTab();
};

TextDrive.prototype.setHasChromeFrame = function(hasFrame) {
  this.hasFrame_ = hasFrame;
  this.windowController_.windowControlsVisible(!hasFrame);
};

var textDrive = new TextDrive();

$(document).ready(textDrive.init.bind(textDrive));
