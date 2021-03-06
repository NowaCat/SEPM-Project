package rmit.assignment.tourManagementTool.security;

public class WebSecurityConstants {
    public static final String DELETE_USER_URLS = "/api/users/delete/**";
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String LOCATION_URLS = "/api/location/**";
    public static final String TOUR_URLS = "/api/tour/**";
    public static final String H2_URL = "/h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 1000_000;
}
