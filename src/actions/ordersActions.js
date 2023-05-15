import Swal from "sweetalert2";
import client from "../config/axiosConfig";
import { errorNotify, successNotify } from "../helpers/helpers";
import { types } from "../types";
import axios from "axios";
import Cookies from "js-cookie";

export const startLoadPendingOrders = (token) => {
  return async (dispatch) => {
    try {
      let url = "/orders/pendient/payments/web";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(loadPendingOrders(data.orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadPendingOrders = (pendingOrders) => ({
  type: types.loadPenddingOrders,
  payload: pendingOrders,
});

export const selectedOrderPendding = (order_id, total, totalPayments) => ({
  type: types.selectedOrderPendding,
  payload: {
    order_id,
    total,
    totalPayments,
  },
});

export const startLoadOrdersCanceled = (token) => {
  return async (dispatch) => {
    try {
      let url = "/orders/canceled/payments/web";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(loadOrdersCanceled(data.orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadOrdersCanceled = (data) => ({
  type: types.loadOrdersCanceled,
  payload: data,
});

export const startLoadOrdersApproved = (token) => {
  return async (dispatch) => {
    try {
      let url = "/orders/approved/payments/web";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(loadOrdersApproved(data.orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadOrdersApproved = (ordersApproved) => ({
  type: types.loadOrdersApproved,
  payload: ordersApproved,
});

export const startLoadOrdersShipped = (token) => {
  return async (dispatch) => {
    try {
      let url = "/orders/shipped/payments/web";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(loadOrdersShipped(data.orders));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadOrdersShipped = (ordersShipped) => ({
  type: types.loadShippedOrders,
  payload: ordersShipped,
});

export const startUploadProofOfPayment = (data) => {
  return async (dispatch, getState) => {
    const { order_id } = getState().orders;
    const amount = data.get('amount');
    try {
      const token = Cookies.get("token");
      let url = `payments/${order_id}`;
      const res = await client.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
      successNotify("Comprobante de pago se ha subido correctamente");
      if (res.data?.due > 0) successNotify(`El monto por pagar es: $${res.data.due}`);

      dispatch(uploadProofOfPayment(order_id, amount));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }
    }
  };
};

export const uploadProofOfPayment = (order_id, amount) => ({
  type: types.upload_proof_payment_order,
  payload: {
    order_id,
    amount,
  },
});

export const startOrderCancel = (formData, order_id) => {
  return async (dispatch) => {
    try {
      let url = `/orders/request-cancel/${order_id}`;
      const token = Cookies.get("token");
      const { data } = await client.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(orderCancel(order_id, data.order));
      successNotify(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }
      errorNotify("No se pudo cancelar la order - Intenta mas tarder");
    }
  };
};

export const orderCancel = (order_id, order) => ({
  type: types.cancel_order,
  payload: {
    order_id,
    order,
  },
});

export const startCancelInvoice = (formData, order_id) => {
  return async (dispatch) => {
    try {
      let url = `/orders/invoice/request-cancel/${order_id}`;
      const token = Cookies.get("token");
      const { data } = await client.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(cancelInvoice(data.order));
      successNotify(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }
      errorNotify("No se pudo cancelar la order - Intenta mas tarder");
    }
  };
};

const cancelInvoice = (order) =>({
  type: types.cancel_invoice,
  payload: {
    order
  }
});

export const startGetOrder = (_id, token) => {
  return async (dispatch) => {
    try {
      let url = `/orders/${_id}`;
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(getOrder(data.order, data?.shipping, data?.payments ?? []));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const getOrder = (order, shipping, payments) => ({
  type: types.loadOrderById,
  payload: { order, shipping, payments },
});

export const startInvoidedOrder = (order_id, status) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");

      let url = `/orders/invoice/${order_id}`;
      const { data } = await client.post(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(invoicedOrder(data?.first_order, data?.second_order, status));
      Swal.fire({
        title: "Operación Exitosa",
        text: "Tu factura ha sido generada satisfactoriamente , te hemos enviado la factura a tu correo electronico , revisa tu bandeja de entrada , si no has recibido el correo contacta al equipo de soporte",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Vaya ... Hubo un error",
        text: "Contacta al equipo de soporte o verifica tus datos fiscales",
        icon: "error",
      });
    }
  };
};

export const invoicedOrder = (first_order, second_order, status) => ({
  type: types.invoiced_order,
  payload: {
    first_order,
    second_order,
    status,
  },
});

export const startCancelOrderByID = (order_id) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");

      let url = `/orders/cancel/${order_id}`;
      const { data } = await client.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(cancelOrderByID(data.order));
      Swal.fire({
        title: "Operación Exitosa",
        text: data?.message,
        icon: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return Swal.fire({
          title: "Vaya ... Hubo un error",
          text: error.response.data.message,
          icon: "error",
        });
      }

      Swal.fire({
        title: "Vaya ... Hubo un error",
        text: error.message,
        icon: "error",
      });
    }
  };
};

const cancelOrderByID = (order) => ({
  type: types.cancel_order_by_id,
  payload: order,
});


export const loadProductDetail = (product) => ({
  type: types.load_product_detail,
  payload: product,
});

export const getStartedSendImagesToCanvas = (formData) => {
  return async (dispatch, getState) => {
    const { order_id } = getState().orders;
    try {
      const token = Cookies.get("token");
      let url = `/orders/canvas/${order_id}`;
      const { data } = await client.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });
      successNotify(data?.message);
      dispatch(startSendImagesToCanvas(data.order))
      return true;
    } catch (error) {

      if (axios.isAxiosError(error)) {
        errorNotify(error.response.data.message);
        return false;
      }
      errorNotify("Parece que hubo un error - Intenta más tarde")
      return false;

    }
  }
}

const startSendImagesToCanvas = (order) => ({
  type: types.start_send_images_to_canvas,
  payload: order
})

export const startFinishOrderCanvas = (formData, order_id) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      let url = `/orders/finalize-canvas/${order_id}`;
      const { data } = await client.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(finishOrderCanvas(data.order));
      successNotify(data?.message);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error.response.data.message);
        return false;
      }
      errorNotify("Parece que hubo un error - Intenta más tarde")
      return false;
    }
  }
}

const finishOrderCanvas = (order) => ({
  type: types.finish_order_canvas,
  payload: order
})

export const getOrderId = (order_id) => ({
  type: types.get_order_id,
  payload: order_id,
})