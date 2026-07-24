package com.example.assettracker.controller;

import com.example.assettracker.dto.AssetResponse;
import com.example.assettracker.dto.CreateAssetRequest;
import com.example.assettracker.service.AssetService;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/assets")
public class AssetV1Controller {

    private static final Set<String> ALLOWED_SORT_FIELDS = 
            Set.of("assetTag", "name", "status", "category", "location", "serialNumber", "purchaseDate", "updateDate");

    // Constructor injection is the recommended way to get dependencies in Spring.
    private final AssetService assetService;

    public AssetV1Controller(AssetService assetService) {
        this.assetService = assetService;
    }

    // GET /api/v1/assets -> returns all assets
    @GetMapping
    public List<AssetResponse> getAssets(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) String location
    ) {
        return assetService.getAssets(status, category, location);
    }

    @GetMapping("/paged")
    public Page<AssetResponse> getAssetsPaged(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "assetTag") String sortBy,
        @RequestParam(defaultValue = "asc") String direction
    ) {
        if (page < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page index must be more or equal to 0");
        }

        if (size < 1 || size > 50) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page size must between 1 and 50");
        }

        if (sortBy == null || sortBy.isBlank() || !ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid sort field. Allowed fields are: " + ALLOWED_SORT_FIELDS);
        }

        String normalisedDirection = direction.toLowerCase();
        if (!Set.of("asc", "desc").contains(normalisedDirection)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sort direction must be either 'asc' or 'desc'");
        }

        return assetService.getAssetsPaged(page, size, sortBy, direction);
    }

    // GET /api/v1/assets/{id} -> returns a single asset by id
    @GetMapping("/{id}")
    public AssetResponse getAssetById(@PathVariable String id) {
        return assetService.getAssetById(id);
    }

    // POST /api/v1/assets -> create a new asset. @Valid triggers validation annotations
    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody CreateAssetRequest request) {
        AssetResponse created = assetService.createAsset(request);
        // Return 201 Created with the created asset in the body
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
