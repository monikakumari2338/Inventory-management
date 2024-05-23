package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.RTVReasonCodes;

public interface RTVReasonCodesRepo extends JpaRepository<RTVReasonCodes, Integer> {

}
