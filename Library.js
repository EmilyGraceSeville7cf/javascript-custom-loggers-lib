"use strict";

function __currentDate() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "H:m:s");
}

/**
 * Abstract logger to write logs.
 */
class AbstractLogger {
  /**
   * Writes normal message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeLog(message) {}

  /**
   * Writes info message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeInfo(message) {}

  /**
   * Writes warn message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeWarn(message) {}

  /**
   * Writes error message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeError(message) {}

  /**
   * Writes empty line into log stream.
   */
  writeLine() {}
}

/**
 * Logger to write logs to console.
 */
class ConsoleLogger extends AbstractLogger {
  /**
   * Writes normal message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeLog(message) {
    console.log(message);
  }

  /**
   * Writes info message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeInfo(message) {
    console.info(message);
  }

  /**
   * Writes warn message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeWarn(message) {
    console.warn(message);
  }

  /**
   * Writes error message into log stream.
   *
   * @param {string} message Message to log.
   */
  writeError(message) {
    console.error(message);
  }

  /**
   * Writes empty line into log stream.
   */
  writeLine() {}
}

/**
 * Logger to write logs to .log files.
 */
class TextLogger extends AbstractLogger {
  /**
   * Creates logger to write logs to .log files.
   *
   * @param {string} folder  Folder id where create .log file.
   * @param {string} file File name write logs to.
   */
  constructor(folder, file) {
    super();

    /**
     * Folder.
     */
    this.folder = DriveApp.getFolderById(folder);

    /**
     * File.
     */
    this.file = null;

    let iterator = this.folder.getFilesByName(file);
    if (!iterator.hasNext()) this.file = this.folder.createFile(file, "");
    else this.file = iterator.next();
  }

  /**
   * Writes normal message into log stream.
   *
   * @param {message} message Message to log.
   */
  writeLog(message) {
    this.file.setContent(
      `${this.file
        .getBlob()
        .getDataAsString()}\n[log] ${__currentDate()}: ${message}`
    );
  }

  /**
   * Writes info message into log stream.
   *
   * @param {message} message Message to log.
   */
  writeInfo(message) {
    this.file.setContent(
      `${this.file
        .getBlob()
        .getDataAsString()}\n[info] ${__currentDate()}: ${message}`
    );
  }

  /**
   * Writes warn message into log stream.
   *
   * @param {message} message Message to log.
   */
  writeWarn(message) {
    this.file.setContent(
      `${this.file
        .getBlob()
        .getDataAsString()}\n[warn] ${__currentDate()}: ${message}`
    );
  }

  /**
   * Writes error message into log stream.
   *
   * @param {message} message Message to log.
   */
  writeError(message) {
    this.file.setContent(
      `${this.file
        .getBlob()
        .getDataAsString()}\n[error] ${__currentDate()}: ${message}`
    );
  }

  /**
   * Writes empty line into log stream.
   */
  writeLine() {
    this.file.setContent(`${this.file.getBlob().getDataAsString()}\n`);
  }
}

Object.freeze(AbstractLogger);
Object.freeze(ConsoleLogger);
Object.freeze(TextLogger);

/**
 * Creates logger to write logs to console.
 */
function newConsoleLogger() {
  return new ConsoleLogger();
}

/**
 * Creates logger to write logs to .log files.
 *
 * @param {string} folder  Folder id where create .log file.
 * @param {string} file File name write logs to.
 */
function newTextLogger(folder, file) {
  return new TextLogger(folder, file);
}
