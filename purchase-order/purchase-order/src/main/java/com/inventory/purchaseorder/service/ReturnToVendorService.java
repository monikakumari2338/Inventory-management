
package com.inventory.purchaseorder.service;

import java.util.List;
import java.util.UUID;

import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;
import com.inventory.purchaseorder.entity.RTV;
import com.inventory.purchaseorder.entity.RTVProducts;
import com.inventory.purchaseorder.entity.RTVReasonCodes;
import com.inventory.purchaseorder.entity.Suppliers;

public interface ReturnToVendorService {

	String saveProducts(ReturnToVendorCombinedDto RTVCombinedDto, String id);

	List<RTV> getAllVendorReturn();

	List<Suppliers> getAllSuppliers();

	String generatedRandomID();

	List<RTVProducts> getRTVProducts(String rtvId);

	List<RTVReasonCodes> getAllReasonCodes();

}
