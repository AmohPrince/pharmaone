package com.saludos.pharmaone.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class MedicineGroup {
    @Id
    int groupId;
    String groupName;

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
