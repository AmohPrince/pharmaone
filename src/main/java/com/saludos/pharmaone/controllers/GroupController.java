package com.saludos.pharmaone.controllers;


import com.saludos.pharmaone.entities.MedicineGroup;
import com.saludos.pharmaone.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin
public class GroupController {
    @Autowired
    GroupService groupService;

    @GetMapping("/getallgroups")
    public List<MedicineGroup> getAllGroups(){
        return groupService.findAllGroups();
    }
}
