package com.saludos.pharmaone.services;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {
    public List findAllGroups();
}
