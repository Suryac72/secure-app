package main.java.com.devcoder.secureappbackend.module.auth.controller;
@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(
            @Valid @RequestBody LoginRequest request) {
        
        LoginResponse response = authService.authenticate(request);
        return ResponseEntity.ok(
            ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {
        
        LoginResponse response = authService.refreshAccessToken(request);
        return ResponseEntity.ok(
            ApiResponse.success("Token refreshed", response));
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> logout(
            @RequestHeader("Authorization") String token) {
        
        String jwt = token.substring(7);
        authService.logout(jwt);
        return ResponseEntity.ok(
            ApiResponse.success("Logout successful", null));
    }

    @GetMapping("/validate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> validateSession() {
        return ResponseEntity.ok(
            ApiResponse.success("Session valid", true));
    }
}
