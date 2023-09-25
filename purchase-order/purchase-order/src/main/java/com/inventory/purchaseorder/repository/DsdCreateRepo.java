package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdCreate;
import com.inventory.purchaseorder.entity.DsdSuppliers;

public interface DsdCreateRepo extends JpaRepository<DsdCreate, Integer> {

	DsdCreate findBydsdsuppliers(DsdSuppliers id);

}
