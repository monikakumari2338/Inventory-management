
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;
import com.inventory.purchaseorder.dto.ReturnToVendorProcessDto;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessProducts;

public interface ReturnToVendorService {

	String saveProducts(ReturnToVendorCombinedDto RTVCombinedDto);

	ReturnToVendorCombinedDto getRTVProducts(int rtvId);

	String saveRTVProcessProducts(ReturnToVendorProcessDto RTVProcessDto);

	List<ReturnToVendorProcessInfo> getAllViewVendorReturn();

	List<ReturnToVendorProcessInfo> getMatchedRTVById(String id);

	List<ReturnToVendorProcessInfo> getMatchedRTVBySupplier(String name);

	List<ReturnToVendorProcessProducts> getRTVProcessProducts(int rtvId);
}
