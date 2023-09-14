package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.entity.purchaseOrderItemDetails;

public interface PurchaseOrderItemDetailsRepo extends JpaRepository<purchaseOrderItemDetails, Integer> {

	List<purchaseOrderItemDetails> findAllByItems(PurchaseOrderItems PurchaseOrderItems);
	purchaseOrderItemDetails findByColorAndSizeAndStoreAndItems(String color,String size,String stores,PurchaseOrderItems Product);
}