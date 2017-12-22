'use strict';

class UnknownError {
  constructor() {
    this.err_msg = 'Unknown error.';
  }
}

class BadInput {
  constructor(params = []) {
    this.err_msg = 'The parameter is invalid.';
    this.params = params;
  }
}

module.exports = {
  BadInput: BadInput,
  UnknownError: UnknownError
};
