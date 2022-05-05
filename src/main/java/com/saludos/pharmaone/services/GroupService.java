package com.saludos.pharmaone.services;

import com.saludos.pharmaone.entities.MedicineGroup;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {
    public List findAllGroups();

    String addNewGroup(MedicineGroup group);
}
