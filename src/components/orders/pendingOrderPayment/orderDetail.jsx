import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { helpers } from "../../../helpers";
import OrderCancelStatus from "../OrderCancelStatus";
import OrderStatus from "../OrderStatus";

export const OrderDetails = ({ status, shippings }) => {
  
  console.log(shippings)

  return (
    <Grid container spacing={3} className="font-Poppins">
      {
        status === 3 && (
          shippings.map((shipping) => (
            <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="flex justify-between items-center">
              <p>Paquetería:</p>
              <p className="max-w-[300px] text-[#888] text-sm font-light">
                {shipping?.shipment_id?.name}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="flex justify-between items-center">
              <p>Número de guía:</p>
              <p className="max-w-[300px] text-[#888] text-sm font-light">
                {shipping?.no_guide}
              </p>
            </div>
          </Grid>
          </>
          ))
          
        )
      }
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="flex justify-between items-center">
          <p>Dirección de envÍo:</p>
          <p className="max-w-[300px] text-[#888] text-sm font-light">{orderDetail?.shippment_direction?.street},{' '}
            {orderDetail?.shippment_direction?.postalcode}, {' '}
            {orderDetail?.shippment_direction?.city}{' '}
          </p>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="flex justify-between items-center">
          <p>Resumen del pedido</p>
          <Table className="max-w-[300px]">
            <TableHead>
              <TableRow>
                <TableCell className="text-[#888] text-sm font-light">Descripción</TableCell>
                <TableCell className="text-[#888] text-sm font-light" >Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="text-[#888] text-sm font-light">
                  Productos
                </TableCell>
                <TableCell className="text-[#888] text-sm font-light">
                  {subtotal}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-[#888] text-sm font-light">
                  Gastos de Envío
                </TableCell>
                <TableCell className="text-[#888] text-sm font-light">
                  {shippment}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell className="text-[#888] text-sm font-light" >{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Grid> */}
    </Grid>
  )
}