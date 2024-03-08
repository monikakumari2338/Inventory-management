package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.AdhocStockCount;

public interface AdhocStockCountRepo extends JpaRepository<AdhocStockCount, String> {

	List<AdhocStockCount> findAll();
	List<AdhocStockCount> findByAdhocId(String id);
	AdhocStockCount findBySkuAndAdhocId(String sku,String id);
}
