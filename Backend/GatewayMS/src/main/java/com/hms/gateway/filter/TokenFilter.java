package com.hms.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    private static final String SECRET = "2a64742f7310f2b24c8d9091c22a94e258c4f8d9b704e873b8c161f4fc311576c9de292b5ac353aee7256bd65661bf1e12ed7fcee6fa8200991dfbe051320181";

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if(path.equals("/user/login") || path.equals("/user/register")) {
                return chain.filter(exchange.mutate().request(r -> r.header("X-Secret-Key", "SECRET")).build());
            }
            HttpHeaders header = exchange.getRequest().getHeaders();
            if(!header.containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Missing Authorization Header");

            }
            String authHeader = header.getFirst(HttpHeaders.AUTHORIZATION);
            if(authHeader == null || !authHeader.startsWith("Bearer")) {
                throw new RuntimeException("Invalid Authorization Header");
            }
            String token = authHeader.substring(7);

            try {
                Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();

                exchange = exchange.mutate().request(r -> r.header("X-Secret-Key", "SECRET")).build();
                
            } catch (Exception e) {
                throw new RuntimeException("Invalid Token");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
