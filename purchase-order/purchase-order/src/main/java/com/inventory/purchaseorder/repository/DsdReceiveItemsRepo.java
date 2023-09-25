package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdCreate;
import com.inventory.purchaseorder.entity.DsdReceiveItems;

public interface DsdReceiveItemsRepo extends JpaRepository<DsdReceiveItems, Integer> {

	List<DsdReceiveItems> findBydsdcreate(DsdCreate DsdCreate);

}
