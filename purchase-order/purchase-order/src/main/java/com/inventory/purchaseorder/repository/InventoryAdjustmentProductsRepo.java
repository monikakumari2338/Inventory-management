package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;

public interface InventoryAdjustmentProductsRepo extends JpaRepository<InventoryAdjustmentProducts, Integer> {

	List<InventoryAdjustmentProducts> findByInvAdjustment(InventoryAdjustment inventoryAdjustment);
}
