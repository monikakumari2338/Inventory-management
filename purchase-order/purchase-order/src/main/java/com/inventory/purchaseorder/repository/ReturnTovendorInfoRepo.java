package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.ReturnToVendorInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;

public interface ReturnTovendorInfoRepo extends JpaRepository<ReturnToVendorInfo, Integer> {
	
	ReturnToVendorInfo findByrtvId(int rtvId);

}
