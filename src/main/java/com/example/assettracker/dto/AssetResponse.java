package com.example.assettracker.dto;
/*
* DTO is the shape of data send to or returned from the API
* Response DTO = what the backend sends back
* Request DTO = what the frontend send in
*/
public class AssetResponse {

    private String id;
    private String assetTag;
    private String name;
    private String category;
    private String serialNumber;
    private String status;
    private String location;
    private String assignedTo;

    public AssetResponse(String id, String assetTag, String name, String category,
                         String serialNumber, String status, String location, String assignedTo) {
        this.id = id;
        this.assetTag = assetTag;
        this.name = name;
        this.category = category;
        this.serialNumber = serialNumber;
        this.status = status;
        this.location = location;
        this.assignedTo = assignedTo;
    }

    public String getId() {
        return id;
    }

    public String getAssetTag() {
        return assetTag;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public String getStatus() {
        return status;
    }

    public String getLocation() {
        return location;
    }

    public String getAssignedTo() {
        return assignedTo;
    }
}


