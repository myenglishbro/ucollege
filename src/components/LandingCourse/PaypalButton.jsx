// components/PayPalButton.jsx
import React from "react";

export default function PayPalButton() {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
      className="flex justify-center mt-6"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="9GVJUW67RCKXC" />
      <input type="hidden" name="currency_code" value="USD" />
      <input
        type="image"
        src="https://www.paypalobjects.com/es_XC/MX/i/btn/btn_buynowCC_LG.gif"
        alt="Comprar ahora con PayPal"
        title="PayPal es una forma segura y fácil de pagar en línea."
      />
    </form>
  );
}
