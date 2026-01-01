package com.devcoder.secureappbackend.module.session.service;

@Service
public class SessionServiceImpl implements SessionService {

    @Autowired
    private RedisTemplate redisTemplate;
    
    @Autowired
    private AuditService auditService;
    
    private static final String SESSION_PREFIX = "session:";
    private static final long SESSION_TIMEOUT = 30; // 30 minutes

    @Override
    public void createSession(String username, String token) {
        String key = SESSION_PREFIX + username;
        
        UserSession session = UserSession.builder()
            .username(username)
            .token(token)
            .createdAt(LocalDateTime.now())
            .lastActivity(LocalDateTime.now())
            .build();
        
        redisTemplate.opsForValue().set(key, session, 
            SESSION_TIMEOUT, TimeUnit.MINUTES);
        
        auditService.logEvent("SESSION_CREATED", username);
    }

    @Override
    public boolean isSessionValid(String username, String token) {
        String key = SESSION_PREFIX + username;
        UserSession session = (UserSession) redisTemplate.opsForValue().get(key);
        
        if (session == null) {
            return false;
        }
        
        // Check if token matches
        if (!session.getToken().equals(token)) {
            return false;
        }
        
        // Check idle timeout (5 minutes)
        LocalDateTime lastActivity = session.getLastActivity();
        long idleMinutes = ChronoUnit.MINUTES.between(lastActivity, LocalDateTime.now());
        
        if (idleMinutes > 5) {
            invalidateSession(username);
            auditService.logEvent("IDLE_TIMEOUT", username);
            return false;
        }
        
        return true;
    }

    @Override
    public void updateLastActivity(String username) {
        String key = SESSION_PREFIX + username;
        UserSession session = (UserSession) redisTemplate.opsForValue().get(key);
        
        if (session != null) {
            session.setLastActivity(LocalDateTime.now());
            redisTemplate.opsForValue().set(key, session, 
                SESSION_TIMEOUT, TimeUnit.MINUTES);
        }
    }

    @Override
    public void invalidateSession(String username) {
        String key = SESSION_PREFIX + username;
        redisTemplate.delete(key);
        auditService.logEvent("SESSION_INVALIDATED", username);
    }

    @Override
    public void invalidateAllSessions(String username) {
        // For multi-device support
        String pattern = SESSION_PREFIX + username + ":*";
        Set keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}