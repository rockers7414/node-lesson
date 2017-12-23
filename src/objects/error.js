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

class NoAccessToken {
  constructor() {
    this.err_msg = 'No access token provided.';
  }
}

class InvalidToken {
  constructor() {
    this.err_msg = 'Invalid token.';
  }
}

class ResourceNotFound {
  constructor() {
    this.err_msg = 'Resource not found.';
  }
}

class AuthenticationFailed {
  constructor() {
    this.err_msg = 'Failed ot authentication.';
  }
}

class PermissionDenied {
  constructor() {
    this.err_msg = 'Permission denied.';
  }
}

module.exports = {
  BadInput: BadInput,
  UnknownError: UnknownError,
  NoAccessToken: NoAccessToken,
  InvalidToken: InvalidToken,
  ResourceNotFound: ResourceNotFound,
  AuthenticationFailed: AuthenticationFailed,
  PermissionDenied: PermissionDenied
};
