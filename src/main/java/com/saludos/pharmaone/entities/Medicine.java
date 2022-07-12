package com.saludos.pharmaone.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table
public class Medicine {
    @Id
    String medicineId;
    String medicineName;
    int inStock;
    String lifetimeSupply;
    String lifetimeSales;
    String howToUse;
    String sideEffects;

    @OneToOne
    MedicineGroup medicineGroup;

    public Medicine (){

    }

    public Medicine(String medicineId, String medicineName, int inStock, String lifetimeSupply, String lifetimeSales, String howToUse, String sideEffects, int groupId) {
        this.medicineId = medicineId;
        this.medicineName = medicineName;
        this.inStock = inStock;
        this.lifetimeSupply = lifetimeSupply;
        this.lifetimeSales = lifetimeSales;
        this.howToUse = howToUse;
        this.sideEffects = sideEffects;
        this.medicineGroup = new MedicineGroup( groupId, "" ,"");
    }

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

    public MedicineGroup getMedicineGroup() {
        return medicineGroup;
    }

    public void setMedicineGroup(MedicineGroup medicineGroup) {
        this.medicineGroup = medicineGroup;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "medicineId='" + medicineId + '\'' +
                ", medicineName='" + medicineName + '\'' +
                ", inStock=" + inStock +
                ", lifetimeSupply='" + lifetimeSupply + '\'' +
                ", lifetimeSales='" + lifetimeSales + '\'' +
                ", howToUse='" + howToUse + '\'' +
                ", sideEffects='" + sideEffects + '\'' +
                ", medicineGroup=" + medicineGroup +
                '}';
    }
}
