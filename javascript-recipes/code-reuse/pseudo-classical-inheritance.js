/*
 * Reference: http://www.bolinfest.com/javascript/inheritance.php
 */

 /**
 * @param {string} phoneNumber
 * @constructor
 */
Phone = function(phoneNumber) {

  /**
   * @type {string}
   * @private
   */
  this.phoneNumber_ = phoneNumber;
};

/** @return {string} */
Phone.prototype.getPhoneNumber = function() {
  return this.phoneNumber_;
};

/** @return {string} */
Phone.prototype.getDescription = function() {
  return 'This is a phone that can make calls.';
};


/**
 * @param {string} phoneNumber
 * @param {string=} signature
 * @constructor
 * @extends {Phone}
 */
SmartPhone = function(phoneNumber, signature) {
  Phone.call(this, phoneNumber);

  /**
   * @type {string}
   * @private
   */
  this.signature_ = signature || 'sent from ' + this.getPhoneNumber();
};

/**
 * @param {string} emailAddress
 * @param {string} message
 */
SmartPhone.prototype.sendEmail = function(emailAddress, message) {
  // Assume sendMessage() is globally available.
  sendMessage(emailAddress, message + '\n' + this.signature_);
};

/** @override */
SmartPhone.prototype.getDescription = function() {
  return SmartPhone.superClass_.getDescription.call(this) +
      ' It can also send email messages.';
};

// Similarly, here is an example of how these types could be used:

var phone = new Phone('8675309');
var smartPhone = new SmartPhone('5555555', 'Adios'};
smartPhone.sendEmail('noone@example.com', 'I can send email from my phone!');
