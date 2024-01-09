package com.inventory.purchaseorder.dto;

public class PurchaseOrderdto {

	private String poNumber;
	private String status;
	private String asnNumber;
	private int expected_qty;
	private int received_qty;

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(String asnNumber) {
		this.asnNumber = asnNumber;
	}

	public int getExpected_qty() {
		return expected_qty;
	}

	public void setExpected_qty(int expected_qty) {
		this.expected_qty = expected_qty;
	}

	public int getReceived_qty() {
		return received_qty;
	}

	public void setReceived_qty(int received_qty) {
		this.received_qty = received_qty;
	}

	@Override
	public String toString() {
		return "PurchaseOrderdto [poNumber=" + poNumber + ", status=" + status + ", asnNumber=" + asnNumber
				+ ", expected_qty=" + expected_qty + ", received_qty=" + received_qty + "]";
	}

	public PurchaseOrderdto(String poNumber, String status, String asnNumber, int expected_qty, int received_qty) {
		super();
		this.poNumber = poNumber;
		this.status = status;
		this.asnNumber = asnNumber;
		this.expected_qty = expected_qty;
		this.received_qty = received_qty;
	}

	public PurchaseOrderdto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
