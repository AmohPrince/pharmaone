package com.saludos.pharmaone.services;

import com.saludos.pharmaone.entities.MedicineGroup;
import com.saludos.pharmaone.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GroupServiceImplementation implements GroupService{

    @Autowired
    GroupRepository groupRepository;

    @Override
    public List findAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public String addNewGroup(MedicineGroup group) {
        groupRepository.save(group);
        return "Added group " + group.getGroupName();
    }
}
