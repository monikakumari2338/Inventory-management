
package com.inventory.purchaseorder.service;

import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;

public interface ReturnToVendorService {

	String saveProducts(ReturnToVendorCombinedDto RTVCombinedDto);

	ReturnToVendorCombinedDto getRTVProducts(int rtvId);
}
