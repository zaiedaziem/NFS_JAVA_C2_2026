package com.example.supportdesk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "support-desk-api");
        return response;
    }

    @GetMapping("/api/about")
    public Map<String, String> about() {
        Map<String, String> response = new HashMap<>();
        response.put("appName", "Support Desk API");
        response.put("version", "1.0.0");
        response.put("description", "API for managing IT support tickets");
        return response;
    }
}
