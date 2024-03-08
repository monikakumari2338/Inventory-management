package com.inventory.purchaseorder.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.dto.InventoryAdjustmentdto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.InventoryAdjustment;

public interface InventoryAdjustmentRepo extends JpaRepository<InventoryAdjustment, String> {

	InventoryAdjustment findByAdjId(String id);

}
