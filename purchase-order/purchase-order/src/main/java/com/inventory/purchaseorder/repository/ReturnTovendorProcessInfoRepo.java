package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.purchaseorder.entity.ReturnToVendorInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;

public interface ReturnTovendorProcessInfoRepo extends JpaRepository<ReturnToVendorProcessInfo, Integer> {

	ReturnToVendorProcessInfo findByrtvId(int rtvId);
	
	//ReturnToVendorInfo findByrtvId(int rtvId);

}
