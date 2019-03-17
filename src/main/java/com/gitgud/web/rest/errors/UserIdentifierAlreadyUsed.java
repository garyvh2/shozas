package com.gitgud.web.rest.errors;

public class UserIdentifierAlreadyUsed extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public UserIdentifierAlreadyUsed() {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "La cédula ya se utiliza!", "userManagement", "idexists");
    }
}
