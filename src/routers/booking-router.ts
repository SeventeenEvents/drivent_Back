import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, listBookingsForRoom } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .get("/room/:roomId", listBookingsForRoom)
  .all("/*", authenticateToken)
  .get("", listBooking)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
