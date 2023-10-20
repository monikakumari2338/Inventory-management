
package com.inventory.purchaseorder.service;

import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;
import com.inventory.purchaseorder.dto.ReturnToVendorProcessDto;

public interface ReturnToVendorService {

	String saveProducts(ReturnToVendorCombinedDto RTVCombinedDto);

	ReturnToVendorCombinedDto getRTVProducts(int rtvId);

	String saveRTVProcessProducts(ReturnToVendorProcessDto RTVProcessDto);
}
