package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdSuppliers;

public interface DsdSuppliersRepo extends JpaRepository<DsdSuppliers, Integer> {

	DsdSuppliers findBySupplierName(String supplier);

}
