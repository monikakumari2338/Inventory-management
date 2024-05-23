package com.inventory.purchaseorder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RTVReasonCodes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int generatedId;
	private String reason;

	public RTVReasonCodes() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ReasonCodes [generatedId=" + generatedId + ", reason=" + reason + "]";
	}

	public int getGeneratedId() {
		return generatedId;
	}

	public void setGeneratedId(int generatedId) {
		this.generatedId = generatedId;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public RTVReasonCodes(int generatedId, String reason) {
		super();
		this.generatedId = generatedId;
		this.reason = reason;
	}

}
