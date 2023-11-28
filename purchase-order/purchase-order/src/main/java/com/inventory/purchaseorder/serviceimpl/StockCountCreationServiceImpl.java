
package com.inventory.purchaseorder.serviceimpl;

import java.time.LocalDate;
import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.service.StockCountCreationService;
import com.inventory.purchaseorder.dto.StockCountCreationCombinedDto;
import com.inventory.purchaseorder.dto.StockCountCreationProductsdto;
import com.inventory.purchaseorder.dto.StockCountCreationdto;
import com.inventory.purchaseorder.entity.StockCountCreation;
import com.inventory.purchaseorder.entity.StockCountCreationProducts;
import com.inventory.purchaseorder.repository.StockCreationProductsRepo;
import com.inventory.purchaseorder.repository.StockCreationRepo;

@Service
public class StockCountCreationServiceImpl implements StockCountCreationService {

	@Autowired
	private StockCreationRepo creationRepo;

	@Autowired
	private StockCreationProductsRepo creationProductsRepo;

	@Override
	public StockCountCreationCombinedDto saveProducts(StockCountCreationCombinedDto StockCountCreationCombinedDto) {

		StockCountCreation ScCreation = creationRepo
				.findByCountId(StockCountCreationCombinedDto.getCreationdto().getCountId());
		if (ScCreation == null) {
			StockCountCreation stockCountCreation = new StockCountCreation(
					StockCountCreationCombinedDto.getCreationdto().getCountId(),
					StockCountCreationCombinedDto.getCreationdto().getCountDescription(),
					StockCountCreationCombinedDto.getCreationdto().getDate(),
					StockCountCreationCombinedDto.getCreationdto().getStatus(),
					StockCountCreationCombinedDto.getCreationdto().getTotalBookQty());

			creationRepo.save(stockCountCreation);

			StockCountCreation ScCreation1 = creationRepo
					.findByCountId(StockCountCreationCombinedDto.getCreationdto().getCountId());

			for (int i = 0; i < StockCountCreationCombinedDto.getCreationProductsdto().size(); i++) {
				StockCountCreationProducts stockCountCreationProducts = new StockCountCreationProducts(
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getItemNumber(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getItemName(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getCategory(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getColor(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getPrice(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getSize(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getImageData(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getStore(),
						StockCountCreationCombinedDto.getCreationProductsdto().get(i).getBookQty(), ScCreation1);
				creationProductsRepo.save(stockCountCreationProducts);

			}
		}

		return StockCountCreationCombinedDto;

	}

	@Override
	public StockCountCreationCombinedDto getProductsByDate(LocalDate date) {
		StockCountCreation ScCreation = creationRepo.findByDate(date);
		List<StockCountCreationProducts> stockCountCreationProducts = creationProductsRepo.findByStockcount(ScCreation);

		StockCountCreationCombinedDto stockCountCreationCombinedDto = new StockCountCreationCombinedDto();

		StockCountCreationdto stockCountCreationdto = new StockCountCreationdto(ScCreation.getCountId(),
				ScCreation.getCountDescription(), ScCreation.getDate(), ScCreation.getStatus(),
				ScCreation.getTotalBookQty());
		stockCountCreationCombinedDto.setCreationdto(stockCountCreationdto);

		List<StockCountCreationProductsdto> stockCountCreationProductsdto = new ArrayList<>();

		for (int i = 0; i < stockCountCreationProducts.size(); i++) {

			stockCountCreationProductsdto.add(new StockCountCreationProductsdto(
					stockCountCreationProducts.get(i).getId(), stockCountCreationProducts.get(i).getItemNumber(),
					stockCountCreationProducts.get(i).getItemName(), stockCountCreationProducts.get(i).getCategory(),
					stockCountCreationProducts.get(i).getColor(), stockCountCreationProducts.get(i).getPrice(),
					stockCountCreationProducts.get(i).getSize(), stockCountCreationProducts.get(i).getImageData(),
					stockCountCreationProducts.get(i).getStore(), stockCountCreationProducts.get(i).getBookQty(),
					stockCountCreationProducts.get(i).getStockcount().getCountId()));
		}

		stockCountCreationCombinedDto.setCreationProductsdto(stockCountCreationProductsdto);
		return stockCountCreationCombinedDto;
	}

}
