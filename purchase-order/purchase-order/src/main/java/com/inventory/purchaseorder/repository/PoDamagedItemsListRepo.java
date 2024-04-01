package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.purchaseorder.entity.PoDamagedItemsList;
import java.util.List;

public interface PoDamagedItemsListRepo extends JpaRepository<PoDamagedItemsList, Integer> {

	List<PoDamagedItemsList> findByAsnNumberOrPoNumber(int asnNumber, int poNumber);
}