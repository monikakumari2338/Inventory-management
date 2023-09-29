package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdReceiveItems;

public interface DsdReceiveItemsRepo extends JpaRepository<DsdReceiveItems, Integer> {

	DsdReceiveItems findByItemNumberAndColorAndSizeAndStoreAndDsdinvoice(String itemNumber, String color, String size,
			String Store, DsdInvoice dsdInvoice);
	List<DsdReceiveItems> findAllByDsdinvoiceIn(List<DsdInvoice> dsdInvoice1);
}
