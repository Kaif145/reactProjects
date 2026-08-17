import moneyGenrator from "../../utiles/money"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function PaymentSummery({paymentSummery,loadCart}){
    const navigate = useNavigate();
    const creatOrder = async ()=>{
        await axios.post('/api/orders');
        await loadCart();
        navigate('/orders');
    }
    return (
        <div className="payment-summary">
                    <div className="payment-summary-title">Payment Summary</div>
                    {paymentSummery && (
                      <>
                        <div className="payment-summary-row">
                          <div>Items ({paymentSummery.totalItems})</div>
                          <div className="payment-summary-money">
                            {moneyGenrator(paymentSummery.productCostCents)}
                          </div>
                        </div>
        
                        <div className="payment-summary-row">
                          <div>Shipping &amp; handling:</div>
                          <div className="payment-summary-money">
                            {moneyGenrator(paymentSummery.shippingCostCents)}
                          </div>
                        </div>
        
                        <div className="payment-summary-row subtotal-row">
                          <div>Total before tax:</div>
                          <div className="payment-summary-money">
                            {moneyGenrator(paymentSummery.totalCostBeforeTaxCents)}
                          </div>
                        </div>
        
                        <div className="payment-summary-row">
                          <div>Estimated tax (10%):</div>
                          <div className="payment-summary-money">
                            {moneyGenrator(paymentSummery.taxCents)}
                          </div>
                        </div>
        
                        <div className="payment-summary-row total-row">
                          <div>Order total:</div>
                          <div className="payment-summary-money">
                            {moneyGenrator(paymentSummery.totalCostCents)}
                          </div>
                        </div>
        
                        <button className="place-order-button button-primary" onClick={creatOrder}>
                          Place your order
                        </button>
                      </>
                    )}
                  </div>
    )
}