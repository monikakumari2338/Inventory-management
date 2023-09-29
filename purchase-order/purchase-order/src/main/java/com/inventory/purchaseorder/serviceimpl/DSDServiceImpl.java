
package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdReceiveItems;
import com.inventory.purchaseorder.entity.DsdSuppliers;
import com.inventory.purchaseorder.repository.DsdInvoiceRepo;
import com.inventory.purchaseorder.repository.DsdSuppliersRepo;
import com.inventory.purchaseorder.service.DSDService;

@Service
public class DSDServiceImpl implements DSDService {

	@Autowired
	private DsdSuppliersRepo DsdRepo;

	@Autowired
	private com.inventory.purchaseorder.repository.DsdReceiveItemsRepo DsdItemsRepo;

	@Autowired
	private DsdInvoiceRepo invoiceRepo;

	@Override
	public DsdReceiveItemsdto saveDsd(DsdReceiveItemsdto DsdReceiveItemsdto) {
		DsdInvoice dsdInvoice = invoiceRepo.findByInvoiceId(DsdReceiveItemsdto.getInvoiceId());
		DsdReceiveItems DsdReceiveItems1 = DsdItemsRepo.findByItemNumberAndColorAndSizeAndStoreAndDsdinvoice(
				DsdReceiveItemsdto.getItemNumber(), DsdReceiveItemsdto.getColor(), DsdReceiveItemsdto.getSize(),
				DsdReceiveItemsdto.getStore(), dsdInvoice);

		System.out.println("DsdReceiveItems1 : " + DsdReceiveItems1);
		if (DsdReceiveItems1 == null) {

			DsdReceiveItems dsdReceiveItems = new DsdReceiveItems(DsdReceiveItemsdto.getItemNumber(),
					DsdReceiveItemsdto.getItemName(), DsdReceiveItemsdto.getExpectedQty(),
					DsdReceiveItemsdto.getCategory(), DsdReceiveItemsdto.getColor(), DsdReceiveItemsdto.getPrice(),
					DsdReceiveItemsdto.getSize(), DsdReceiveItemsdto.getImageData(), DsdReceiveItemsdto.getStore(),
					DsdReceiveItemsdto.getStock(), dsdInvoice);

//			System.out.println("invoice : " + dsdInvoice);
			DsdItemsRepo.save(dsdReceiveItems);
		}

		else {
			int stock = DsdReceiveItems1.getStock();
			DsdReceiveItems1.setStock(stock + DsdReceiveItemsdto.getStock());
			DsdItemsRepo.save(DsdReceiveItems1);
		}

		return DsdReceiveItemsdto;
	}

	@Override
	public List<DsdReceiveItemsdto> getDsdItems(int supplier) {
		DsdSuppliers dsdSuppliers = DsdRepo.findBySupplierId(supplier);
		List<DsdInvoice> DsdInvoice1 = invoiceRepo.findAllBySupplierId(dsdSuppliers);
		List<DsdReceiveItems> dsdReceiveItems = DsdItemsRepo.findAllByDsdinvoiceIn(DsdInvoice1);
		List<DsdReceiveItemsdto> dsdReceiveItemsdto = new ArrayList<>();
		for (int i = 0; i < dsdReceiveItems.size(); i++) {
			dsdReceiveItemsdto.add(
					new DsdReceiveItemsdto(dsdReceiveItems.get(i).getItemNumber(), dsdReceiveItems.get(i).getItemName(),
							dsdReceiveItems.get(i).getExpectedQty(), dsdReceiveItems.get(i).getCategory(),
							dsdReceiveItems.get(i).getColor(), dsdReceiveItems.get(i).getPrice(),
							dsdReceiveItems.get(i).getSize(), dsdReceiveItems.get(i).getImageData(),
							dsdReceiveItems.get(i).getStore(),dsdReceiveItems.get(i).getStock(), dsdReceiveItems.get(i).getDsdinvoice().getInvoiceId()));
		}

		System.out.println("DsdSuppliers : " + dsdSuppliers);
		System.out.println("DsdInvoice : " + DsdInvoice1);
		System.out.println("dsdReceiveItemsdto : " + dsdReceiveItemsdto);

		return dsdReceiveItemsdto;
	}

}
