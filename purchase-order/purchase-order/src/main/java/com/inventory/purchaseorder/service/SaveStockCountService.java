
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.SaveStockCountCombinedDto;
import com.inventory.purchaseorder.dto.StockCountOnloadDto;
import com.inventory.purchaseorder.entity.SaveStockCountInfo;
import com.inventory.purchaseorder.entity.SaveStockCountProducts;

public interface SaveStockCountService {

	SaveStockCountCombinedDto saveProducts(SaveStockCountCombinedDto saveStockCountCombinedDto);

	StockCountOnloadDto getStockCountInfo();

	List<SaveStockCountProducts> getStockCountProductsByCountId(int id);

}
