package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.purchaseorder.entity.ReturnToVendorInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessProducts;

public interface ReturnTovendorProcessInfoRepo extends JpaRepository<ReturnToVendorProcessInfo, Integer> {

	ReturnToVendorProcessInfo findByrtvId(int rtvId);
	
	//ReturnToVendorInfo findByrtvId(int rtvId);

}
