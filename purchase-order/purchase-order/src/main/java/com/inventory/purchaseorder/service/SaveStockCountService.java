
package com.inventory.purchaseorder.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.inventory.purchaseorder.dto.SaveStockCountCombinedDto;
import com.inventory.purchaseorder.dto.StockCountCreationCombinedDto;
import com.inventory.purchaseorder.entity.SaveStockCountInfo;

public interface SaveStockCountService {

	SaveStockCountCombinedDto saveProducts(SaveStockCountCombinedDto saveStockCountCombinedDto);

	List<SaveStockCountInfo> getStockCountInfo();


}
