
package com.inventory.purchaseorder.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.inventory.purchaseorder.dto.SaveStockCountCombinedDto;
import com.inventory.purchaseorder.dto.StockCountCreationCombinedDto;
import com.inventory.purchaseorder.entity.SaveStockCountInfo;
import com.inventory.purchaseorder.entity.SaveStockCountProducts;

public interface SaveStockCountService {

	SaveStockCountCombinedDto saveProducts(SaveStockCountCombinedDto saveStockCountCombinedDto);

	List<SaveStockCountInfo> getStockCountInfo();

	List<SaveStockCountProducts> getStockCountProductsByCountId(int id);


}
