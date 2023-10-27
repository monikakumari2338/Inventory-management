package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;

public interface InventoryAdjustmentProductsRepo extends JpaRepository<InventoryAdjustmentProducts, Integer> {

}
