
package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;
import com.inventory.purchaseorder.entity.DsdCreate;
import com.inventory.purchaseorder.entity.DsdReceiveItems;
import com.inventory.purchaseorder.entity.DsdSuppliers;
import com.inventory.purchaseorder.repository.DsdSuppliersRepo;
import com.inventory.purchaseorder.service.DSDService;
import com.inventory.purchaseorder.repository.DsdCreateRepo;
import com.inventory.purchaseorder.repository.DsdReceiveItemsRepo;

@Service
public class DSDServiceImpl implements DSDService {

	@Autowired
	private DsdSuppliersRepo DsdRepo;

	@Autowired
	private DsdCreateRepo DsdCreateRepo;

	@Autowired
	private DsdReceiveItemsRepo dsdReceiveItemsRepo;

	@Override
	public List<DsdReceiveItemsdto> getDsdItems(String supplier) {
		DsdSuppliers dsdSuppliers = DsdRepo.findBySupplierName(supplier);
		DsdCreate dsdcreate = DsdCreateRepo.findBydsdsuppliers(dsdSuppliers);
		List<DsdReceiveItems> dsdReceiveItems = dsdReceiveItemsRepo.findBydsdcreate(dsdcreate);
		List<DsdReceiveItemsdto> dsdReceiveItemsdto = new ArrayList<>();
		for (int i = 0; i < dsdReceiveItems.size(); i++) {
			dsdReceiveItemsdto.add(
					new DsdReceiveItemsdto(dsdReceiveItems.get(i).getItemNumber(), dsdReceiveItems.get(i).getItemName(),
							dsdReceiveItems.get(i).getExpectedQty(), dsdReceiveItems.get(i).getCategory(),
							dsdReceiveItems.get(i).getColor(), dsdReceiveItems.get(i).getPrice(),
							dsdReceiveItems.get(i).getSize(), dsdReceiveItems.get(i).getImageData(),
							dsdReceiveItems.get(i).getStore(), dsdReceiveItems.get(i).getDsdcreate().getDsdId()));
		}

		System.out.println("DsdSuppliers : " + dsdSuppliers);
		System.out.println("Dsdcreate : " + dsdcreate);
		System.out.println("dsdReceiveItemsdto : " + dsdReceiveItemsdto);

		return dsdReceiveItemsdto;
	}

}
