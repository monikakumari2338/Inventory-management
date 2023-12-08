package com.inventory.purchaseorder.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.InventoryAdjustment;

public interface InventoryAdjustmentRepo extends JpaRepository<InventoryAdjustment, Integer> {

	InventoryAdjustment findByadjId(int id);
	List<InventoryAdjustment> findByDate(LocalDate date);
}
