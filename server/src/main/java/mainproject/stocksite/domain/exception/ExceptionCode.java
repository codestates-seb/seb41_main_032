package mainproject.stocksite.domain.exception;

import lombok.Getter;

public enum ExceptionCode {

    // 401 UNAUTHORIZED 인증되지 않음
    LOGIN_REQUIRED(401, "You need to login"),
    INVALID_TOKEN(401, "Your access-token is invalid"),

    // 404 BAD REQUEST 잘못된 요청
    MEMBER_NOT_FOUND(404, "Member not found"),
    BOOKMARK_NOT_FOUND(404, "Bookmark not found"),
    HAVE_NO_STOCK(404, "You don't have this stock."),
    NOT_ENOUGH_STOCK(404, "Your total stock holdings are not enough"),
    NOT_ENOUGH_MONEY(404, "Your money is not enough"),

    // 409 CONFLICT 중복된 리소스
    MEMBER_EXISTS(409, "Member exists"),
    SIGNUP_EXISTS_EMAIL(409, "This is a registered email"),
    SIGNUP_EXISTS_NICKNAME(409, "This is a registered nickname"),
    ALREADY_EXISTED_BO0MARK(409, "This bookmark is already existed"),

    // 503 SERVICE_UNAVAILABLE 서버 과부하
    UNABLE_TO_REQUEST_AGAIN(503, "Your requests are exceeded");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
