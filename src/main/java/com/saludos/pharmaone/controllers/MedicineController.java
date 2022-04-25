package com.saludos.pharmaone.controllers;

import com.saludos.pharmaone.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.saludos.pharmaone.entities.Medicine;

import java.util.List;

@RestController
public class MedicineController {

   @Autowired
    MedicineService medicineService;


    @GetMapping("/getallmedicine")
    public List<Medicine> getAllMedicine(Medicine medicine){

        return medicineService.getAllMedicines(medicine);
    }
    @PostMapping("/addMedicine")
    public String addMedicine (@RequestBody Medicine medicine){
        return medicineService.addMedicine(medicine);
    }

}
