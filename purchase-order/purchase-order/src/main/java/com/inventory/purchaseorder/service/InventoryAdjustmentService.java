
package com.inventory.purchaseorder.service;

import java.time.LocalDate;
import java.util.List;

import com.inventory.purchaseorder.dto.InventoryAdjustmentCombinedDto;
import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;

public interface InventoryAdjustmentService {

	String saveInventoryAdjustment(InventoryAdjustmentCombinedDto InvAdjCombinedDto);

	List<InventoryAdjustment> getInventoryAdjustment(LocalDate date);

	List<InventoryAdjustment> getAllInventoryAdjustment();

	List<InventoryAdjustmentProducts> getInventoryAdjustmentProducts(int id);

	
}
