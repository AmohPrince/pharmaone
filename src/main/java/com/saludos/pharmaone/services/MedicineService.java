package com.saludos.pharmaone.services;

import com.saludos.pharmaone.entities.Medicine;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicineService {
    public List getAllMedicines(Medicine medicine);

    String addMedicine(Medicine medicine);

    String modifyMedicine(Medicine medicine);

    Medicine getSingleMedicine(String medicineId);

    String deleteMedicine(String medicineId);
}
