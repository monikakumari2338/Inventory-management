package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdReceiveItems;
import com.inventory.purchaseorder.entity.DsdSuppliers;

public interface DsdInvoiceRepo extends JpaRepository<DsdInvoice, Integer> {

	DsdInvoice findByInvoiceId(int id);
	List<DsdInvoice> findAllBySupplierId(DsdSuppliers dsdSuppliers);
}
