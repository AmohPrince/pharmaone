package com.saludos.pharmaone.controllers;

import com.saludos.pharmaone.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.saludos.pharmaone.entities.Medicine;

import java.util.List;

@CrossOrigin
@RestController
public class MedicineController {

   @Autowired
    MedicineService medicineService;


    @GetMapping("/getallmedicine")
    public List<Medicine> getAllMedicine(Medicine medicine){

        return medicineService.getAllMedicines(medicine);
    }
    @GetMapping("/getsinglemedicine/{medicineId}")
    public Medicine getSingleMedicine(@PathVariable String medicineId){
        return medicineService.getSingleMedicine(medicineId);
    }
    @PostMapping("/addMedicine")
    public String addMedicine (@RequestBody Medicine medicine){
        return medicineService.addMedicine(medicine);
    }

    @PutMapping("/modifymedicine")
    public String modifyMedicine(@RequestBody Medicine medicine){
        return medicineService.modifyMedicine(medicine);

    }

}
