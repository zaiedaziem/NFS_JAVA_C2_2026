package com.example.assettracker.service;

import com.example.assettracker.dto.AssetResponse;
import com.example.assettracker.dto.CreateAssetRequest;
import com.example.assettracker.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
 * AssetService
 * ------------
 * Services contain business logic. They are simple POJOs annotated with
 * @Service so Spring will detect and manage them (as beans) during startup.
 *
 * This example uses an in-memory list to keep the example simple for students.
 * In production you would typically talk to a database via a Repository.
 */
@Service
public class AssetService {

    // In-memory data store used for teaching/demo purposes only
    private final List<AssetResponse> assets = new ArrayList<>();

    public AssetService() {
        // Seed with example data so the app has something to return right away.
        assets.add(new AssetResponse(
                "A001",
                "LAP-2026-001",
                "Dell Latitude 5440",
                "Laptop",
                "SN-LAP-001",
                "AVAILABLE",
                "HQ Level 3",
                null
        ));

        assets.add(new AssetResponse(
                "A002",
                "MON-2026-002",
                "Dell 24-inch Monitor",
                "Monitor",
                "SN-MON-002",
                "ASSIGNED",
                "HQ Level 2",
                "amir@example.com"
        ));

        assets.add(new AssetResponse(
                "A003",
                "PRJ-2026-003",
                "Epson Projector",
                "Projector",
                "SN-PRJ-003",
                "MAINTENANCE",
                "Training Room 1",
                null
        ));
    }

    // Return all assets. Note: returning the internal list directly is simple
    // for learning but would be unsafe in a concurrent production app.
    public List<AssetResponse> getAllAssets() {
        return assets;
    }

    // Find an asset by id or throw a ResourceNotFoundException which is
    // handled globally by GlobalExceptionHandler.
    public AssetResponse getAssetById(String id) {
        return assets.stream()
                .filter(asset -> asset.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Asset " + id + " was not found"));
    }

    // Create a new asset from the request DTO. Demonstrates simple mapping
    // from request -> response DTO and updating the in-memory store.
    public AssetResponse createAsset(CreateAssetRequest request) {
        AssetResponse created = new AssetResponse(
                createNextId(),
                request.getAssetTag().trim(),
                request.getName().trim(),
                request.getCategory().trim(),
                request.getSerialNumber().trim(),
                "AVAILABLE",
                request.getLocation().trim(),
                null
        );

        assets.add(created);
        return created;
    }

    // Helper to create a simple sequential id. Not thread-safe but fine for demo.
    private String createNextId() {
        return "A" + String.format("%03d", assets.size() + 1);
    }
}
