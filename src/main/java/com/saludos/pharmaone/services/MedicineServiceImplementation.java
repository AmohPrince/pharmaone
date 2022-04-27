package com.saludos.pharmaone.services;

import com.saludos.pharmaone.entities.Medicine;
import com.saludos.pharmaone.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MedicineServiceImplementation  implements MedicineService{
    @Autowired
    MedicineRepository medicineRepository;

    @Override
    public List<Medicine> getAllMedicines(Medicine medicine) {
        return medicineRepository.findAll();
    }

    @Override
    public String addMedicine(Medicine medicine) {
        medicineRepository.save(medicine);
        System.out.println("Added medicine "+ medicine.getMedicineName());
        return "Added medicine "+ medicine.getMedicineName() ;
    }

    @Override
    public String modifyMedicine(Medicine medicine) {
        medicineRepository.save(medicine);

        return "Modified " + medicine.getMedicineName();
    }

    @Override
    public Medicine getSingleMedicine(String medicineId) {
        return medicineRepository.findById(medicineId).get();
    }
}
