
package com.inventory.purchaseorder.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.service.SaveStockCountService;

import com.inventory.purchaseorder.dto.SaveStockCountCombinedDto;
import com.inventory.purchaseorder.dto.SaveStockCountProductsdto;
import com.inventory.purchaseorder.entity.SaveStockCountInfo;
import com.inventory.purchaseorder.entity.SaveStockCountProducts;
import com.inventory.purchaseorder.repository.SaveStockProductsRepo;

import com.inventory.purchaseorder.repository.SaveStockInfoRepo;

@Service
public class SaveStockCountServiceImpl implements SaveStockCountService {

	@Autowired
	private SaveStockInfoRepo saveStockInfoRepo;

	@Autowired
	private SaveStockProductsRepo saveStockProductsRepo;

	@Override
	public SaveStockCountCombinedDto saveProducts(SaveStockCountCombinedDto saveStockCountCombinedDto) {

		SaveStockCountInfo StockCountInfo = new SaveStockCountInfo(
				saveStockCountCombinedDto.getSaveStockCountInfo().getCountId(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getCountDescription(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getStartedAt(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getCompletedAt(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getStatus(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getTotalBookQty(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getCountedQty(),
				saveStockCountCombinedDto.getSaveStockCountInfo().getVarianceQty());

		saveStockInfoRepo.save(StockCountInfo);

		SaveStockCountInfo countObject = saveStockInfoRepo
				.findByCountId(saveStockCountCombinedDto.getSaveStockCountInfo().getCountId());
		for (int i = 0; i < saveStockCountCombinedDto.getSaveStockCountProducts().size(); i++) {
			SaveStockCountProducts StockCountProduct = new SaveStockCountProducts(
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getItemNumber(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getItemName(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getCategory(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getColor(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getPrice(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getSize(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getImageData(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getStore(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getBookQty(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getCountedQty(),
					saveStockCountCombinedDto.getSaveStockCountProducts().get(i).getVarianceQty(), countObject);

			saveStockProductsRepo.save(StockCountProduct);
		}
		return saveStockCountCombinedDto;

	}

	@Override
	public List<SaveStockCountInfo> getStockCountInfo() {

		List<SaveStockCountInfo> stockCountInfoList = saveStockInfoRepo.findByStatus("completed");
		return stockCountInfoList;

	}
	
	@Override
	public List<SaveStockCountProducts> getStockCountProductsByCountId(int id) {
		System.out.print("id "+id);
		SaveStockCountInfo countObject=saveStockInfoRepo.findByCountId(id);
		System.out.print("countObject "+countObject);
		List<SaveStockCountProducts> stockCountProducts = saveStockProductsRepo.findByStockcount(countObject);
		return stockCountProducts;

	}

}
