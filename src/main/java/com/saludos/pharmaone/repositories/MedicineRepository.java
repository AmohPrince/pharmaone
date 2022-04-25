package com.saludos.pharmaone.repositories;

import com.saludos.pharmaone.entities.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository  extends JpaRepository<Medicine , Integer> {
}
