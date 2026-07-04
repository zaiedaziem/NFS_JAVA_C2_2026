package com.example.assettracker.service;

import java.util.ArrayList;
import java.util.List;

import com.example.assettracker.dto.AssetResponse;
import com.example.assettracker.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AssetService {
    private final List<AssetResponse> assets = new ArrayList<>();

    public AssetService() {
        assets.add(new AssetResponse(
            "A001",
            "sampletag",
            "Macbook Pro",
            "Laptop",
            "FR354GRR43",
            "active", 
            "Kuala Lumpur", 
            "JA"
        ));

        assets.add(new AssetResponse(
            "A002",
            "sampletag",
            "Macbook Air",
            "Laptop",
            "FR354FRF343GRR43",
            "active", 
            "Kuala Lumpur", 
            "JA"
        ));

        assets.add(new AssetResponse(
            "A003",
            "sampletag",
            "Lenovo Thinkpad",
            "Laptop",
            "FR3GFFR43RR43",
            "active", 
            "Kuala Lumpur", 
            "JA"
        ));
    }

    public List<AssetResponse> getAllAssets() {
        return assets;
    }

    public AssetResponse getAssetById(String id) {
        return assets.stream()
                .filter(asset -> asset.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Asset " + id + " was not found"));
    }

    private String createNextId() {
        return "A" + String.format("%03d", assets.size() + 1);
    }
}
