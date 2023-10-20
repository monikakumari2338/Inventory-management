package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.purchaseorder.entity.ReturnToVendorInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessProducts;
import com.inventory.purchaseorder.entity.ReturnToVendorProducts;

public interface ReturnTovendorProcessProductsRepo extends JpaRepository<ReturnToVendorProcessProducts, Integer> {

	//List<ReturnToVendorProducts> findByrtvInfo(ReturnToVendorInfo RTVInfo);

	//String saveAll(List<ReturnToVendorProcessProducts> rtvProcessProducts);
}
