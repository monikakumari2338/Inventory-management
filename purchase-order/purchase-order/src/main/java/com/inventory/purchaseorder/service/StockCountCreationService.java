
package com.inventory.purchaseorder.service;

import java.time.LocalDate;
import java.util.Date;

import com.inventory.purchaseorder.dto.StockCountCreationCombinedDto;

public interface StockCountCreationService {

	StockCountCreationCombinedDto saveProducts(StockCountCreationCombinedDto StockCountCreationCombinedDto);

	StockCountCreationCombinedDto getProductsByDate(LocalDate date);

}
