package com.saludos.pharmaone.controllers;


import com.saludos.pharmaone.services.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class SalesController {

    @Autowired
    SalesService salesService;

    @GetMapping("/getListOfSales")
    public List getListOfSales (){
        return salesService.findListOfSales();
    }
}
