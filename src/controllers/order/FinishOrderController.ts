import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController{
    async handle(req: Request, res: Response){

        const { order_id } = req.body;

        const finishOrderService = new FinishOrderService();

        const orders = await finishOrderService.execute({
            order_id
        });

        return res.json(orders)

    }
}

export { FinishOrderController }