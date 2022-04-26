package com.saludos.pharmaone.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Medicine {
    @Id
    String medicineId;
    String medicineName;
    String groupName;
    int inStock;
    String lifetimeSupply;
    String lifetimeSales;
    String howToUse;
    String sideEffects;

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(String medicineId) {
        this.medicineId = medicineId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getInStock() {
        return inStock;
    }

    public void setInStock(int inStock) {
        this.inStock = inStock;
    }

    public String getLifetimeSupply() {
        return lifetimeSupply;
    }

    public void setLifetimeSupply(String lifetimeSupply) {
        this.lifetimeSupply = lifetimeSupply;
    }

    public String getLifetimeSales() {
        return lifetimeSales;
    }

    public void setLifetimeSales(String lifetimeSales) {
        this.lifetimeSales = lifetimeSales;
    }

    public String getHowToUse() {
        return howToUse;
    }

    public void setHowToUse(String howToUse) {
        this.howToUse = howToUse;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }
}
